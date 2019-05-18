/** Testing **/
let test = new SafeObj({
  a: {
    b: {
      c: {
        d1: {
          e: {
            total: 10
          }
        },
        d2: {
          e: {
            total: 5
          }
        },
        d3: {
          e: {
            total: 7
          }
        }
      },
      c_i: [
        {
          i: 1
        },
        {
          i: 2
        },
        {
          i: 3
        }
      ],
      c_s: [
        {
          s: 'a'
        },
        {
          s: 'b'
        },
        {
          s: 'c'
        }
      ]
    }
  }
});

// The most unit-y of tests
// Basic usage
console.log("test.get('a.b.c.d1.e.total') == 10",
  test.get('a.b.c.d1.e.total') == 10
);
console.log("test.get('a.b.c.d1') == {e:{total:10}}", isEquivalent(
  test.get('a.b.c.d1'), {e:{total:10}}
));
console.log("test.get('a.b.c', 'd1', 'e', 'total') == 10",
  test.get('a.b.c', 'd1', 'e', 'total') == 10
);
// Fails
console.log("test.get('a.b.c.f') == null",
  test.get('a.b.c.f') == null
);
// List usage
console.log("test.get('a.b.c_i',[0,1],'i') == [1,2]", isEquivalent(
  test.get('a.b.c_i',[0,1],'i'), [1,2]
));
console.log("test.get('a.b.c_i.[0,1].i') == [1,2]", isEquivalent(
  test.get('a.b.c_i.[0,1].i'), [1,2]
));
// Wildcard list usage
console.log("test.get('a.b.c_i.[*].i') == [1,2,3]", isEquivalent(
  test.get('a.b.c_i.[*].i'), [1,2,3]
));

// Object usage
console.log("test.get('a.b.c.{d1,d2}.e.total') == {d1:10, d2:5}", isEquivalent(
  test.get('a.b.c.{d1,d2}.e.total'), {d1:10, d2:5}
));

console.log("test.get('a.b.c', {d1:null, d2:null},'e.total') == {d1:10, d2:5}", isEquivalent(
  test.get('a.b.c', {d1:null, d2:null},'e.total'), {d1:10, d2:5}
));

console.log("test.get('a.b.c.{*}.e.total') == {d1:10, d2:5, d3:7}", isEquivalent(
  test.get('a.b.c.{*}.e.total'), {d1:10, d2:5, d3:7}
));

// Sum usage
console.log("test.sum('a.b.c_i',[1,2],'i') == 5",
  test.sum('a.b.c_i',[1,2],'i') == 5
);
console.log("test.sum('a.b.c_i.[*].i') == 6",
  test.sum('a.b.c_i.[*].i') == 6
);
console.log("test.sum('a.b.c_s',[1,2],'s') == 'bc'",
  test.sum('a.b.c_s',[1,2],'s') == 'bc'
);
console.log("test.sum('a.b.c_s.[*].s') == 'abc'",
  test.sum('a.b.c_s.[*].s') == 'abc'
);

// Basic equivalence tester.
function isEquivalent(a, b) {
  let aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];

    if(typeof a[propName] == 'object' && typeof b[propName] == 'object') {
      if(!isEquivalent(a[propName], b[propName])) {
        return false;
      }
    }
    else if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
}
