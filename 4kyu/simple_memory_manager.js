class MemoryManager {
  /**
   * @constructor Creates a new memory manager for the provided array.
   * @param {memory} An array to use as the backing memory.
   */
      constructor(memory) {
        this.memory = memory;
        this.free = memory.length;
        this.memory[0] = {
          size: memory.length,
          free: true,
          prev: null,
          next: null,
          data: null,
        }
      }
  /**
   * Allocates a block of memory of requested size.
   * @param {number} size - The size of the block to allocate.
   * @returns {number} A pointer which is the index of the first location in the allocated block.
   * @throws If it is not possible to allocate a block of the requested size.
   */
      allocate(size) {
        if (size > this.free) {
          throw new Error(`cannot allocate more memory than exists`);
        }
        else {
          let i = 0;
          while (i < this.memory.length) {
            let currBlock = this.memory[i];
            if (currBlock.free) {
              if (size < currBlock.size) {
                let newBlock = {
                  size: size,
                  free: false,
                  prev: currBlock.prev,
                  next: i + size,
                  data: new Array(size),
                }
                this.memory[i] = newBlock;
                currBlock.size -= size;
                currBlock.prev = i;
                this.memory[i+size] = currBlock;
                this.free -= size;
                return i;
              }
              else if (size === currBlock.size) {
                currBlock.free = false;
                currBlock.data = new Array(currBlock.size);
                this.free -= size;
                return i;
              }
              else {
                i += currBlock.size;
                continue;
              }
            }
            else {
              i += this.memory[i].size;
              continue;
            }
          }
          throw new Error(`cannot allocate more memory than available`);
        }
      }
  /**
   * Releases a previously allocated block of memory.
   * @param {number} pointer - The pointer to the block to release.
   * @throws If the pointer does not point to an allocated block.
   */
      release(pointer) {
        if (this.memory[pointer] && !this.memory[pointer].free) {
          let freeBlock = this.memory[pointer];
          freeBlock.free = true;
          freeBlock.data = null;
          this.free += freeBlock.size;
          if (freeBlock.next && this.memory[freeBlock.next].free) {
            let next = freeBlock.next;
            freeBlock.size += this.memory[next].size;
            freeBlock.next = this.memory[next].next;
            this.memory[next] = null;
          }
          if (freeBlock.prev && this.memory[freeBlock.prev].free) {
            let prev = freeBlock.prev;
            if (this.memory[freeBlock.next]) {
              this.memory[freeBlock.next].prev = prev;
            }
            this.memory[prev].size += freeBlock.size;
            this.memory[prev].next = freeBlock.next;
            //this.memory[prev].data = null;
            this.memory[pointer] = null;
          }
        }
        else {
          throw new Error(`no memory has been allocated`);
        }
      }
  /**
   * Reads the value at the location identified by pointer
   * @param {number} pointer - The location to read.
   * @returns {number} The value at that location.
   * @throws If pointer is in unallocated memory.
   */
      read(pointer) {
        let i = pointer;
        let ptr = 0;
        while(!this.memory[i]) {
          i--;
          ptr++;
        }
        if (!this.memory[i].free) {
          if (this.memory[i].data[ptr]) {
            return this.memory[i].data[ptr];
          }
          else {
            return undefined;
          }
        }
        else {
          throw new Error(`no memory has been allocated`);
        }
      }
  /**
   * Writes a value to the location identified by pointer
   * @param {number} pointer - The location to write to.
   * @param {number} value - The value to write.
   * @throws If pointer is in unallocated memory.
   */
      write(pointer, value) {
        let i = pointer;
        let ptr = 0;
        while (!this.memory[i]) {
          i--;
          ptr++;
        }
        if (!this.memory[i].free) {
          this.memory[i].data[ptr] = value;
        }
        else {
          throw new Error(`no memory has been allocated`);
        }
      }
  }


// Tests =======================================================================
// Allocate is constrained by memory size
let mem = new MemoryManager(new Array(256));
// mem.allocate(512);
mem.allocate(128);
//mem.allocate(129);
console.log(mem.memory)

// Allocate does not have a memory overhead
mem = new MemoryManager(new Array(256));
for (let i = 0; i < 256; i++) {
  mem.allocate(1);
}
console.log(mem)

// Released memory may be re-allocated
mem = new MemoryManager(new Array(64));
let pointer1 = mem.allocate(32);
let pointer2 = mem.allocate(32);
mem.release(pointer1);
mem.allocate(32)
console.log(mem)

// Released memory is merged when free blocks are adjacent
mem = new MemoryManager(new Array(64));
pointer1 = mem.allocate(16);
pointer2 = mem.allocate(16);
let pointer3 = mem.allocate(16);
let pointer4 = mem.allocate(16);
mem.release(pointer3);
mem.release(pointer2);
mem.allocate(32);
console.log(mem)

// May not write to unallocated blocks
mem = new MemoryManager(new Array(64));
//mem.write(1, 1);

// May write to allocated blocks
let array = new Array(64),
a = 0,
b = 1,
c = 31,
d = 32;
mem = new MemoryManager(array);
pointer1 = mem.allocate(32);
mem.write(pointer1, a);
// TODO make data property an array of size of the block so indeces within that
// TODO block can be written to
mem.write(pointer1 + b, b);
mem.write(pointer1 + c, c);
//mem.write(pointer1 + d);
console.log(mem)
console.log(mem.memory[0].data)

// May not read from unallocated blocks
mem = new MemoryManager(new Array(64));
//mem.read(1);

// May read from allocated blocks
mem = new MemoryManager(new Array(64));
pointer1 = mem.allocate(32);
mem.write(pointer1, 1)
console.log(mem.read(pointer1));
console.log(mem.read(pointer1 + 1));