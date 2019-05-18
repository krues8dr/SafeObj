# SafeObj

 JavaScript requires you to test every value in a nested object, which can add a lot of bloated tests for "undefined" if you're dealing with deeply nested objects. This is a fancy little map/reducer for complex Javascript data objects. Check out the tests file to see all the features. 

Works client-side on most major browsers without any polyfills. Great for use with your favorite javascript chart library!

```
let SafeObj = require('./safeobj.js');

var myData = new SafeObj({
	a: {
		b: {
			c0: 17,
			c1: [
				{ total: 1 },
				{ total: 5 },
				{ total: 7 }
			],
			c2: {
				d1: {	total: 1 },
				d2: { total: 3 },
				d3: {	total: 6 }
			}
		}
	}
})

myData.get('a.b.c0'); // 17
myData.get('a.b.f.total'); // null

myData.get('a.b.c1',[0,1],'total'); // [1,5]
myData.get('a.b.c1.[*].total'); // [1,5,7]

myData.get('a.b.c2.{d1,d2}.total'); // {d1:1, d2:3}
myData.get('a.b.c2.{*}.total'); // {d1:1, d2:3, d3: 6}

myData.sum('a.b.c1',[1,2],'total'); // 12
```

See the tests file for full usage examples.
