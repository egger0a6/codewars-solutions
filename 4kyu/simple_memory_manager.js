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
        console.log(this.memory)
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
              if (currBlock.size < size) {
                let newBlock = {
                  size: size,
                  free: false,
                  prev: currBlock.prev,
                  next: i + size,
                  data: null,
                }
                this.memory[i] = newBlock;
                currBlock.size -= size;
                currBlock.prev = i;
                this.memory[i+size] = currBlock;
                this.free -= size;
                return i;
              }
              else if (currBlock.size === size) {
                currBlock.free = false;
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
          this.free += freeBlock.size;
          if (freeBlock.next && this.memory[freeBlock.next].free) {
            let next = freeBlock.next;
            freeBlock.size += this.memory[next].size;
            freeBlock.next = this.memory[next].next;
            this.free += this.memory[next].size;
            this.memory[next] = null;
          }
          if (freeBlock.prev && this.memory[freeBlock.prev.free]) {
            let prev = freeBlock.prev;
            this.memory[prev].size += freeBlock.size;
            this.memory[prev].next = freeBlock.next;
            this.free += this.memory[prev].size;
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
        if (this.memory[pointer] && !this.memory[pointer].free) {
          if (this.memory[pointer]) {
            return this.memory[pointer].data;
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
        if (this.memory[pointer] && !this.memory[pointer].free) {
          this.memory[pointer].data = value;
        }
        else {
          throw new Error(`no memory has been allocated`);
        }
      }
  }


  const mem = new MemoryManager(new Array(256));

  mem.allocate(128);
  console.log(mem.memory)