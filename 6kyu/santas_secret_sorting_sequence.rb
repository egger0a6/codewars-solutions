# Solution for 6kyu Kata "Santa's Secret Sorting Sequence" https://www.codewars.com/kata/52b21970f49607a660000b8f

def sort(gifts)
  return quick_sort(gifts, 0, gifts.length - 1)
end

def quick_sort(arr, from_idx, to_idx)
  if from_idx < to_idx
    pivot_idx = partition(arr, from_idx, to_idx)
    quick_sort(arr, from_idx, pivot_idx - 1)
    quick_sort(arr, pivot_idx + 1, to_idx)
  end
  return arr
end

def partition(arr, from_idx, to_idx)
  pivot_val = arr[to_idx]
  ptr_a_idx = ptr_b_idx = from_idx
  while ptr_a_idx < to_idx
    comparison = arr[ptr_a_idx] <=> pivot_val
    if comparison == -1
      arr[ptr_a_idx], arr[ptr_b_idx] = arr[ptr_b_idx], arr[ptr_a_idx]
      ptr_b_idx += 1
    end
    ptr_a_idx += 1
  end
  arr[ptr_b_idx], arr[to_idx] = arr[to_idx], arr[ptr_b_idx]
  return ptr_b_idx
end