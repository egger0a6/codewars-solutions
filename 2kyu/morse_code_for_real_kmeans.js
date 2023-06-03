const MAX_ITERATIONS = 50;
const onesK = 2;
const zerosK = 3;

const MORSE_CODE = { 
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '.-.-.-': '.',
  '--..--': ',',
  '..--..': '?',
  '.----.': '\'',
  '-.-.--': '!',
  '-..-.': '/',
  '-.--.': '(',
  '-.--.-': ')',
  '.-...': '&',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '.-.-.': '+',
  '-....-': '-',
  '..--.-': '_',
  '.-..-.': '"',
  '...-..-': '$',
  '.--.-.': '@',
  '...---...': 'SOS' 
}


function decodeOnes(seq, kOnes, kZeros) {
  if (kOnes.length === 1) {
    if (!kZeros.length) {
      return ".";
    }
    else {
      let rate = kOnes[0].centroid / kZeros[0].centroid;
      if (rate <= 1) return ".";
      else return "-";
    }
  }
  else {
    for (let i = 0; i < kOnes.length; i++) {
      if (kOnes[i].sequences.includes(seq)) return kOnes[i].centroid;
    }
  }
  return;
}


function decodeZeros(seq, kZeros, kOnes) {
  if (kZeros.length === 1) {
    let rate = kZeros[0].centroid / kOnes[0].centroid;
    if (!rate) rate = kZeros[0].centroid / kOnes[0].centroid.length;
    if (rate <= 1) return "";
    else if (rate > 1 && rate <= 5) return " ";
    else return "   ";
  }
  else {
    for (let i = 0; i < kZeros.length; i++) {
      if (kZeros[i].sequences.includes(seq)) return kZeros[i].centroid;
    }
  }
  return;
}


var decodeBitsAdvanced = function(bits){
    bits = bits.replace(/^0+|0+$/g, '');
    if (!bits) return "";
    console.log(bits)
  
    bits = bits.split(/(1+)/).filter(seq => seq !== "");
    
    let ones = bits.filter(seq => seq.includes("1")).sort((a, b) => a.length - b.length);
    let zeros = bits.filter(seq => seq.includes("0")).sort((a, b) => a.length - b.length);

    if (bits.length > 400) {
      let bitsCopy = [...bits];
      let kmeansBits = kmeansClustering(bitsCopy.sort((a, b) => a.length - b.length), 3);

      if (ones.length) {
        ones = [];
        kmeansBits.forEach(cluster => {
          let c = {};
          c.sequences = cluster.sequences.filter(seq => seq.includes("1"));
          c.centroid = cluster.centroid;
          ones.push(c);
        });

        ones = ones
        .filter(cluster => cluster && cluster.sequences.length)
        .sort((a, b) => a.centroid - b.centroid);
        if (ones.length === 2) {
          ones = ones.map((cluster, idx) => {
            if (idx === 0) cluster.centroid = ".";
            else cluster.centroid = "-";
            cluster.sequences = cluster.sequences.sort((a, b) => a.length - b.length);
            return cluster;
          });
        }
      }

      if (zeros.length) {
        zeros = [];
        kmeansBits.forEach(cluster => {
          let c = {};
          c.sequences = cluster.sequences.filter(seq => seq.includes("0"));
          c.centroid = cluster.centroid;
          zeros.push(c);
        });

        zeros = zeros
        .filter(cluster => cluster && cluster.sequences.length)
        .sort((a, b) => a.centroid - b.centroid);
        if (zeros.length === 3) {
          zeros = zeros.map((cluster, idx) => {
            if (idx === 0) cluster.centroid = "";
            else if (idx === 1) cluster.centroid = " ";
            else cluster.centroid = "   ";
            cluster.sequences = cluster.sequences.sort((a, b) => a.length - b.length)
            return cluster;
          });
        }
      }

      let boundary;
      boundary = Math.ceil((ones[0].sequences[ones[0].sequences.length - 1].length + ones[1].sequences[0].length) / 2);
      ones[1].sequences.forEach(seq => {
        if (seq.length === boundary) ones[0].sequences.push(seq);
      });
      while(ones[1].sequences[0].length === boundary) {
        ones[1].sequences.shift()
      }

      boundary = Math.ceil((zeros[0].sequences[zeros[0].sequences.length - 1].length + zeros[1].sequences[0].length) / 2);
      zeros[1].sequences.forEach(seq => {
        if (seq.length === boundary) zeros[0].sequences.push(seq);
      });
      while(zeros[1].sequences[0].length === boundary) {
        zeros[1].sequences.shift()
      }

      boundary = Math.ceil((zeros[1].sequences[zeros[1].sequences.length - 2].length + zeros[2].sequences[1].length) / 2);
      zeros[2].sequences.forEach(seq => {
        if (seq.length === boundary) zeros[1].sequences.push(seq);
      });
      while(zeros[2].sequences[0].length === boundary) {
        zeros[2].sequences.shift()
      }

      console.log(ones[0].sequences[ones[0].sequences.length - 1].length + ", " + ones[1].sequences[0].length)
      console.log(zeros[0].sequences[zeros[0].sequences.length - 1].length + ", " + zeros[1].sequences[0].length)
      console.log(zeros[1].sequences[zeros[1].sequences.length - 1].length + ", " + zeros[2].sequences[0].length)
      console.log(zeros[2].sequences[zeros[2].sequences.length - 1].length)
    }
    else {
      if (ones.length) {
        ones = kmeansClustering(ones, onesK)
        .filter(cluster => cluster && cluster.sequences.length)
        .sort((a, b) => a.centroid - b.centroid);
        if (ones.length === 2) {
          ones = ones.map((cluster, idx) => {
            if (idx === 0) cluster.centroid = ".";
            else cluster.centroid = "-";
            cluster.sequences = cluster.sequences.sort((a, b) => a.length - b.length);
            return cluster;
          });
        }
      }
      if (zeros.length) {
        zeros = kmeansClustering(zeros, zerosK)
        .filter(cluster => cluster && cluster.sequences.length)
        .sort((a, b) => a.centroid - b.centroid);
        if (zeros.length === 3) {
          zeros = zeros.map((cluster, idx) => {
            if (idx === 0) cluster.centroid = "";
            else if (idx === 1) cluster.centroid = " ";
            else cluster.centroid = "   ";
            cluster.sequences = cluster.sequences.sort((a, b) => a.length - b.length)
            return cluster;
          });
        }
      }
      // console.log(ones[0].sequences[ones[0].sequences.length - 1].length + ", " + ones[1].sequences[0].length)
      // console.log(zeros[0].sequences[zeros[0].sequences.length - 1].length + ", " + zeros[1].sequences[0].length)
      // console.log(zeros[1].sequences[zeros[1].sequences.length - 1].length + ", " + zeros[2].sequences[0].length)
      // console.log(zeros[2].sequences[zeros[2].sequences.length - 1].length)
    }

    bits = bits.map(seq =>  {
      if (seq.includes("1"))  {
        return decodeOnes(seq, ones, zeros);
      }
      else {
        return decodeZeros(seq, zeros, ones);
      }
    }).join("");
    console.log(bits)
  
    return bits;
}

var decodeMorse = function(morseCode){
    if (!morseCode) return "";
    let morseCodes = morseCode.trim().split(/[ ]{3,}/);
    let text = "";
    morseCodes.forEach(code => {
      text += " ";
      code.split(/[ ]/).forEach(seq => {
        text = text.concat(MORSE_CODE[seq]);                   
      });
    });
    console.log(text.substring(1,))
    return(text.substring(1,));
}


/* Following functions are all used to implement K-means Clustering algorithm
for grouping the bits. */

function calcRandomCentroids(bits, k) {
  let centroids = [];
  while (centroids.length < k) {
    let index = Math.floor(Math.random() * bits.length);
    if (centroids.indexOf(bits[index].length) === -1) centroids.push(bits[index].length);
  }
  return centroids;
}


function calcLengthDiff(seq1, mean) {
  return Math.abs(seq1.length - mean);
}


function assignCentroids(bits, centroids) {
  let clusters = {};
  for (let i = 0; i < centroids.length; i++) {
    clusters[i] = {
      sequences: [],
      centroid: centroids[i],
    };
  }
  
  for (let i = 0; i < bits.length; i++) {
    let seq = bits[i];
    let closestCentroid, closestCentIdx, prevDist;
    
    for (let j = 0; j < centroids.length; j++) {
      let centroid = centroids[j];
      if (j === 0) {
        closestCentroid = centroid;
        closestCentIdx = j;
        prevDist = calcLengthDiff(seq, closestCentroid);
      }
      else {
        let distance = calcLengthDiff(seq, centroid);
        if (distance < prevDist) {
          prevDist = distance;
          closestCentroid = centroid;
          closestCentIdx = j;
        }
      }
    }
    clusters[closestCentIdx].sequences.push(seq);
  }
  return clusters;
}


function getMeanSeq(bits) {
  let mean = 0;
  bits.forEach(seq => {
    mean += seq.length;
  })
  return Math.round(mean / bits.length);
}


function calcNewCentroids(bits, clusters, k) {
  let newCentroid;
  let newCentroids = [];
  
  for (let i in clusters) {
    let cluster = clusters[i];
    if (cluster.sequences.length > 0) {
      newCentroid = getMeanSeq(cluster.sequences);
    }
    else {
      newCentroid = calcRandomCentroids(bits, 1)[0];
    }
    newCentroids.push(newCentroid);
  }
  return newCentroids;
}


function stopConverging(prevCentroids, centroids, currIteration) {
  if (currIteration > MAX_ITERATIONS) return true;
  
  if (!prevCentroids || !prevCentroids.length) return false;
  
  for (let i = 0; i < centroids.length; i++) {
    if (centroids[i] !== prevCentroids[i]) return false;
  }
  return true;
}


function kmeansClustering(bits, k) {
  let currIteration = 0;
  let prevCentroids, clusters, centroids;
  
  if (bits.length <= k) {
    centroids = bits;
  }
  else {
    centroids = calcCentroidsNaiveSharding(bits, k);
  }

  while (!stopConverging(prevCentroids, centroids, currIteration)) {
    prevCentroids = [...centroids];
    currIteration++;
    
    clusters = assignCentroids(bits, centroids);
    centroids = calcNewCentroids(bits, clusters, k);
  }

  let finalClusters = [];
  for (let i = 0; i < k; i++) {
    finalClusters.push(clusters[i]);
  }
  return finalClusters;
}



/* Functions used for variation of Naive Sharding method of selecting initial
 centroids. */

function calcCentroidsNaiveSharding(bits, k) {
  let step = Math.floor(bits.length / k);
  let centroids = [];

  // for (let i = 0; i < k; i++) {
  //   let start = step * i;
  //   let end = step * (i + 1);
  //   if (i + 1 === k) end = bits.length;

  //   centroids.push(calcMeanCentroids(bits, start, end));
  // }

  centroids.push(bits[0].length)
  if (k === 3) centroids.push(bits[bits.length-1].length)
  centroids.push(bits[Math.floor(bits.length / 2)].length)
  return centroids;
}

function calcMeanCentroids(bits, start, end) {
  let total = end - start;
  let mean = 0;

  for (let i = start; i < end; i++) {
    mean += bits[i].length;
  }

  return (mean / total);
}

decodeMorse(decodeBitsAdvanced('101'));
decodeMorse(decodeBitsAdvanced('10000001'));
decodeMorse(decodeBitsAdvanced('1'));
decodeMorse(decodeBitsAdvanced("10111"));
decodeMorse(decodeBitsAdvanced("111000111"));
decodeMorse(decodeBitsAdvanced("111110000011111"));
decodeMorse(decodeBitsAdvanced('0000000011011010011100000110000001111110100111110011111100000000000111011111111011111011111000000101100011111100000111110011101100000100000'));
decodeMorse(decodeBitsAdvanced("1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"));
decodeMorse(decodeBitsAdvanced("111111100000011010001110111000000001110000000000000000001111111011111100001101111100000111100111100011111100000001011100000011111110010001111100110000011111100101111100000000000000111111100001111010110000011000111110010000011111110001111110011111110000010001111110001111111100000001111111101110000000000000010110000111111110111100000111110111110011111110000000011111001011011111000000000000111011111011111011111000000010001001111100000111110111111110000001110011111100011111010000001100001001000000000000000000111111110011111011111100000010001001000011111000000100000000101111101000000000000011111100000011110100001001100000000001110000000000000001101111101111000100000100001111111110000000001111110011111100011101100000111111000011011111000111111000000000000000001111110000100110000011111101111111011111111100000001111110001111100001"));

decodeMorse(decodeBitsAdvanced("111111110000000111111111111000000000001111111110000011111111101000000001111111111110110000111111110111111111110000000000000000000111111111100001100011111111111110001110000000000011111111111100001111111111000011001111111111100000000001111111111110111000011100000000000000000011111111110101111111101100000000000000011111111111000011111111111100001000011111111111111000000000001111111110000000110000001110000000000000000000000000000111100011111000001111000000001111111111001111111111001111111111111000000000111100111110111111100000000000000000000001111111111100000000111110000000111110000000011111111111100000000011111000111111110000000001111111111100000110000000001111100000001110000000000111111111111110001110011111111110011111100000000000000000000011110001111111111000011111111111111001000000000011111111001111111101111111100000000111011111110001110000000010011111110000000011111111110000000001111000011111110000000000000111111111001111111101111111111000000000001111111100000011000000000000000000001111111010100000100000011111111000000000111110001111111110000001111111111100111111110011111111100000000110001111111100001110111111111111000011111000011111111000000000000111100111011100010001111111100000000011110000111111100101100011111111110000000000000000001111111111100000001000000000000000000111101111100000010000111011100000000000111111111000000111111111111001111111111110001111111110000011111111000000000000011101111111111110000001100111111111111011100011111111111000000001111000001111000001111111111000001111111111110000000111111110000000000010000001111000000010000011111001111111111100000000000000000000100011111111000000111111111000000000000001000011111111111101110011111111111000001111111000011111111110000000000000000000000000111000001111111111110111100000000100000000111111111000111111111111000011100001111111111111000000000000001111100000111110011111111000000000000111000111000000000000111110000011111111111010000000011100000000000000000000000000001111100100000000001111111110000111111111100000000001111111111111011111111111000000000100000000000000111111111001000011000000000000001111001111000000000011000000011111111111100000000111111111110000000001111000000000000000000001111011111111111110000000000011110000111110000111100000000011001111111001110000000001001110000000000001111100000100000111110000000000000011111111111000000001101111111111000000000000001111111111111000001110000000001111111100011110000001111111101111110000000011110000000000100001111111110000111100011111111101111100001111111111110000000000000000000000001111111111100000001110111111111000111111100000000011111111100000111111111001111111100000000011111111111001111111111100000000001100000000000000000010000111111111100000000011111111100000000000000000000000111111111111110000001111111110000011111111100000000001111111100000100000000111111110000111110011111111000000011100000000111100000000010111111110000111110111111111100110111111111110000000000000000001000111111111111011111111000000000000000011000000000000000000111100101111100000000111111111000000000011111000111111111111011000000001111100000111100001111111111110000000011111111111000011101111111111101110000000000111111111011111000111111111100000000000000000000000000100001111111111000000000011111111101111100000000000000000000001100000111100000000000011111111111001100011111111000000111000000000001111100000000111111111100000111110000011110001100000000111000000000000001111000011111111111000001110000000011111111110000001111111111001100000000011110000011111111000111000011111111100000100111111111100000000000000000001111000000111110000011110000000001111110011100000000111111110001000000000000111111110000110011111111000000000001101110000000000001111111111110001000000001111111111100000011111111110111"))