function ArrayComprehension(options) {
  console.log(options.generator)
  options = options.generator.split(/([,])|([.]+)/).filter(term => term);
  console.log(options)
  return [];
}