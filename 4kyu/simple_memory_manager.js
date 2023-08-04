class MemoryManager {
  /**
   * @constructor Creates a new memory manager for the provided array.
   * @param {memory} An array to use as the backing memory.
   */
      constructor(memory) {
        this.memory = memory;
        this.blocks = new Array(memory.size);
        this.free = memory.length;
        this.blocks[0] = {
          size: memory.length,
          free: true,
          prev: null,
          next: null,
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
          while (i < this.blocks.length) {
            let currBlock = this.blocks[i];
            if (currBlock.free) {
              if (size < currBlock.size) {
                let newBlock = {
                  size: size,
                  free: false,
                  prev: currBlock.prev,
                  next: i + size,
                }
                this.blocks[i] = newBlock;
                currBlock.size -= size;
                currBlock.prev = i;
                this.blocks[i+size] = currBlock;
                this.free -= size;
                return i;
              }
              else if (size === currBlock.size) {
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
              i += this.blocks[i].size;
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
        if (this.blocks[pointer] && !this.blocks[pointer].free) {
          let freeBlock = this.blocks[pointer];
          freeBlock.free = true;
          this.free += freeBlock.size;
          for (let i = pointer; i < pointer + freeBlock.size; i++) {
            this.memory[i] = null;
          }
          if (freeBlock.next && this.blocks[freeBlock.next].free) {
            let next = freeBlock.next;
            freeBlock.size += this.blocks[next].size;
            freeBlock.next = this.blocks[next].next;
            this.blocks[next] = null;
          }
          if (freeBlock.prev && this.blocks[freeBlock.prev].free) {
            let prev = freeBlock.prev;
            if (this.blocks[freeBlock.next]) {
              this.blocks[freeBlock.next].prev = prev;
            }
            this.blocks[prev].size += freeBlock.size;
            this.blocks[prev].next = freeBlock.next;
            this.blocks[pointer] = null;
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
        while(!this.blocks[i]) {
          i--;
        }
        if (!this.blocks[i].free) {
          if (this.memory[pointer]) {
            return this.memory[pointer];
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
        while (!this.blocks[i]) {
          i--;
        }
        if (!this.blocks[i].free) {
          this.memory[pointer] = value;
        }
        else {
          throw new Error(`no memory has been allocated`);
        }
      }
  }