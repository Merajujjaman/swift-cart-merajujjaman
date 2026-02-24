## Swift Cart
## JavaScript প্রশ্ন ও উত্তর (Bangla)

### 1. What is the difference between null and undefined??

- **undefined**  
  - কোনো ভেরিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু কোনো ভ্যালু অ্যাসাইন করা হয়নি তাহলে  undefined হবে ।  
  ```js
  let x;
  console.log(x); // undefined
  ```

- **null**  
  - কোনো ভেরিয়েবলের ভ্যালু খালি বোঝাতে null ব্যবহার করা হয় ।
  ```js
  let y = null;
  ```

### 2. What is the use of the map() function in JavaScript? How is it different from forEach()?

- **map()**   
  - মূল array-এর প্রতিটি এলিমেন্টের উপর একটি ফাংশন প্রয়োগ করে, তার রেজাল্ট নিয়ে নতুন array বানায়।  
  ```js
  const nums = [1, 2, 3];
  const doubled = nums.map(n => n * 2); // [2, 4, 6]
  ```

- **forEach()**  
  - কোনো নতুন array রিটার্ন করে না (রিটার্ন ভ্যালু `undefined`)।  
  ```js
  const nums = [1, 2, 3];
  nums.forEach(n => console.log(n)); // 
  ```

### 3. What is the difference between == and ===?


- **== (loose equality)**  
  - দুই পাশে টাইপ ভিন্ন হলে আগে টাইপ কনভার্ট করে তারপর তুলনা করে।  
  ```js
  2 == "2";   // true
  ```

- **=== (strict equality)**  
  - আগে টাইপ চেক করে, টাইপ একই হলে তবেই ভ্যালু তুলনা করে।  
  - কোনো টাইপ কনভার্সন করে না।  
  ```js
  2 === "2";  // false
  2 === 2;    // true
  ```

### 4. What is the significance of async/await in fetching API data?

- `async/await` দিয়ে asynchronous কোড করা যায়।  
- `fetch()` একটি promise রিটার্ন করে; `await` ব্যবহার করলে সেই promise resolve হওয়া পর্যন্ত কোড “অপেক্ষা” করে, কিন্তু থ্রেড ব্লক করে না।  

```js
async function loadData() {
  try {
    const res = await fetch('https://merajujjaman/data');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### 5. Explain the concept of Scope in JavaScript (Global, Function, Block).

**Scope** মানে কোনো ভেরিয়েবল/ফাংশন কোডের কোন অংশ থেকে অ্যাক্সেস করা যাবে তা নির্ধারণ করা।

- **Global Scope**  
  - কোনো ফাংশন বা ব্লকের বাইরে ডিক্লেয়ার করা ভেরিয়েবল যা পুরো ফাইলে যেকোনো জায়গা থেকে ব্যবহার করা যায়।  
  ```js
  let a = 10; // global
  function foo() {
    console.log(a); 
  }
  ```

- **Function Scope (Local Scope)**  
  - ফাংশনের ভিতরে `let`, `const` দিয়ে ডিক্লেয়ার করা ভেরিয়েবল শুধুমাত্র সেই ফাংশনের ভিতরেই থাকে।  
  ```js
  function bar() {
    let b = 5; // function scoped
  }
  console.log(b); // Error: b is not defined
  ```

- **Block Scope** (`let`, `const`)  
  - `{ ... }` ব্লকের ভিতরে `let` বা `const` দিয়ে ডিক্লেয়ার করা ভেরিয়েবল শুধুমাত্র ওই ব্লকের ভিতরে থাকে।  
  ```js
  if (true) {
    let c = 7;
    const d = 8;
  }
  console.log(c, d); // Error: not defined
  ```

