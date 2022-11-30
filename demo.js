// 判断是否是数组的方式

// const arr = [1, 2, 3]
// console.log(Array.isArray(arr))

// const arr = [1, 2, 3]
// console.log(arr instanceof Array)

// console.log(Object.prototype.toString.call(arr).indexOf('Array') > -1)

// console.log(Array.prototype.isPrototypeOf(arr))

// console.log(arr.constructor.toString().indexOf('Array') > -1)

// 找出多维数组中的最大值
// function findMax (arr) {
//   const newArr = []
//   arr.forEach((item, index) => {
//     newArr.push(Math.max(...item))
//   })
//   return newArr
// }

// console.log(findMax(
//   [
//     [4, 5, 1, 3],
//     [13, 27, 18, 26],
//     [35, 35, 37, 39],
//     [1000, 1001, 857, 1]

//   ]

// ))

// 冒泡排序
// const bubbleSort = arr => {
//   console.time()
//   if (arr.length <= 1) return arr
//   for (let i = 0; i < arr.length - 1; i++) {
//     let hasChange = false
//     for (let j = 0; j < arr.length - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         const temp = arr[j]
//         arr[j] = arr[j + 1]
//         arr[j + 1] = temp
//         hasChange = true
//       }
//     }
//     if (!hasChange) {
//       console.log('冒泡排序结果：', arr)
//     }
//   }
// }
// const arr1 = [3, 5, 4, 6, 8, 1, 2]
// bubbleSort(arr1)

// 快速排序
// const quickSort = arr => {
//   if (arr.length <= 1) return arr
//   const midIndex = Math.floor(arr.length / 2)
//   const valArr = arr.splice(midIndex, 1)
//   const arrMidIndex = valArr[0]
//   // const arrMidIndex = arr[midIndex]
//   const left = []
//   const right = []

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < arrMidIndex) {
//       left.push(arr[i])
//     } else {
//       right.push(arr[i])
//     }
//   }
//   return quickSort(left).concat(arrMidIndex, quickSort(right))
// }
// const arr1 = [3, 5, 4, 6, 8, 1, 2]
// console.log(quickSort(arr1))

// const insertSort = array => {
//   const len = array.length
//   if (len <= 1) return

//   let preIndex, current
//   for (let i = 1; i < len; i++) {
//     preIndex = i - 1 // 待比较元素的下标
//     current = array[i] // 当前元素
//     while (preIndex >= 0 && array[preIndex] > current) {
//       // 前置条件之一: 待比较元素比当前元素大
//       array[preIndex + 1] = array[preIndex] // 将待比较元素后移一位
//       preIndex-- // 游标前移一位
//     }
//     if (preIndex + 1 !== i) {
//       // 避免同一个元素赋值给自身
//       array[preIndex + 1] = current // 将当前元素插入预留空位
//       // console.log('array :', array)
//     }
//   }
//   return array
// }

// const arr1 = [3, 5, 4, 6, 8, 1, 2]
// console.log(insertSort(arr1))

// 折半插入排序
// const BinInsertSort = arr => {
//   if (arr.length <= 1) return
//   let left, right, cur
//   for (let i = 1; i < arr.length; i++) {
//     left = 0
//     right = i - 1
//     cur = arr[i]
//     while (left <= right) {
//       const middle = (left + right) >> 1
//       if (cur < arr[middle]) {
//         right = middle - 1
//       } else {
//         left = middle + 1
//       }
//     }
//     for (let j = i - 1; j >= left; j--) {
//       arr[j + 1] = arr[j]
//     }
//     arr[left] = cur
//   }

//   return arr
// }

// const arr1 = [3]
// console.log(BinInsertSort(arr1))

// 选择排序
// const selectSort = arr => {
//   // if (arr.length <= 1) return arr
//   let i, min, temp, j
//   for (i = 0; i < arr.length - 1; i++) {
//     min = i
//     for (j = i + 1; j < arr.length; j++) {
//       if (arr[j] < arr[min]) {
//         min = j
//       }
//     }
//     temp = arr[i]
//     arr[i] = arr[min]
//     arr[min] = temp
//   }
//   return arr
// }
// const arr1 = [3]
// console.log(selectSort(arr1))

// const binaryInsertionSort = array => {
//   const len = array.length
//   if (len <= 1) return

//   let current, i, j, low, high, m
//   for (i = 1; i < len; i++) {
//     low = 0
//     high = i - 1
//     current = array[i]

//     while (low <= high) {
//       // 步骤 1 & 2 : 折半查找
//       m = (low + high) >> 1 // 注: x>>1 是位运算中的右移运算, 表示右移一位, 等同于 x 除以 2 再取整, 即 x>>1 == Math.floor(x/2) .
//       if (array[i] >= array[m]) {
//         // 值相同时, 切换到高半区，保证稳定性
//         low = m + 1 // 插入点在高半区
//       } else {
//         high = m - 1 // 插入点在低半区
//       }
//     }
//     for (j = i; j > low; j--) {
//       // 步骤 3: 插入位置之后的元素全部后移一位
//       array[j] = array[j - 1]
//       console.log('array2 :', JSON.parse(JSON.stringify(array)))
//     }
//     array[low] = current // 步骤 4: 插入该元素
//   }
//   console.log('array2 :', JSON.parse(JSON.stringify(array)))
//   return array
// }

// const mergeSort = arr => {
//   // 采用自上而下的递归方法
//   if (arr.length < 2) {
//     return arr
//   }
//   // length >> 1 和 Math.floor(len / 2) 等价
//   const middle = Math.floor(arr.length / 2)
//   const left = arr.slice(0, middle)
//   const right = arr.slice(middle) // 拆分为两个子数组
//   return merge(mergeSort(left), mergeSort(right))
// }

// const merge = (left, right) => {
//   const result = []

//   while (left.length && right.length) {
//     // 注意: 判断的条件是小于或等于，如果只是小于，那么排序将不稳定.
//     if (left[0] <= right[0]) {
//       result.push(left.shift())
//     } else {
//       result.push(right.shift())
//     }
//   }

//   while (left.length) result.push(left.shift())

//   while (right.length) result.push(right.shift())

//   return result
// }

// const shellSort = arr => {
//   const n = arr.length
//   let d, i, j, temp
//   // d是增量，第一轮为
//   for (d = Math.floor(n / 2); d >= 1; d = Math.floor(d / 2)) {
//     for (i = d; i <= n; ++i) {
//       if (arr[i] < arr[i - d]) {
//         arr[temp] = arr[i]
//         for (j = i - d; j > 0 && arr[0] < arr[j]; j -= d) {
//           arr[j + d] = arr[j]
//         }
//         arr[j + d] = arr[temp]
//       }
//     }
//   }
//   return arr
// }

// const shellSort = arr => {
//   let d = arr.length
//   let j
//   // 增量一直减小到1为止
//   while (d > 1) {
//     // 第一轮增量为数组长度的一半
//     d = Math.floor(d / 2)
//     for (let i = 0; i < d; i++) {
//       for (let index = i + d; index < arr.length; index += d) {
//         const temp = arr[index]
//         // 如果每组前面的数字较大，则交换位置
//         for (j = index - d; j >= 0 && arr[j] > temp; j -= d) {
//           arr[index] = arr[j]
//         }
//         arr[j + d] = temp
//       }
//     }
//   }
//   return arr
// }

// const arr1 = [3, 5, 4, 6, 6, 8, 1, 2, 10]
// console.log(shellSort(arr1))

// const radixSort = array => {
//   const length = array.length

//   // 如果不是数组或者数组长度小于等于1，直接返回，不需要排序
//   if (!Array.isArray(array) || length <= 1) return

//   const bucket = []
//   let max = array[0]
//   let loop

//   // 确定排序数组中的最大值
//   for (let i = 1; i < length; i++) {
//     if (array[i] > max) {
//       max = array[i]
//     }
//   }

//   // 确定最大值的位数
//   loop = (max + '').length

//   // 初始化桶
//   for (let i = 0; i < 10; i++) {
//     bucket[i] = []
//   }

//   for (let i = 0; i < loop; i++) {
//     for (let j = 0; j < length; j++) {
//       const str = array[j] + ''

//       if (str.length >= i + 1) {
//         const k = parseInt(str[str.length - 1 - i]) // 获取当前位的值，作为插入的索引
//         bucket[k].push(array[j])
//       } else {
//         // 处理位数不够的情况，高位默认为 0
//         bucket[0].push(array[j])
//       }
//     }

//     array.splice(0, length) // 清空旧的数组

//     // 使用桶重新初始化数组
//     for (let i = 0; i < 10; i++) {
//       const t = bucket[i].length

//       for (let j = 0; j < t; j++) {
//         array.push(bucket[i][j])
//       }

//       bucket[i] = []
//     }
//   }

//   return array
// }

// const arr1 = [3, 5676, 435, 645, 643, 8235, 122, 255, 10]
// console.log(radixSort(arr1))

// const aa = {}
// console.log(aa)
// setTimeout(() => {
//   aa.a = 1
// })
// setTimeout(() => {
//   aa.a = 2
// }, 5000)
// setTimeout(() => {
//   aa.a = 3
// }, 10000)

setTimeout(() => {
  console.log(1)
}, 0)
new Promise((resolve) => {
  console.log(2)
  resolve()
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
})
console.log(5)
