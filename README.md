## Inconsistent Sorting with Mixed Data Types in MongoDB

This example demonstrates a bug where sorting on a field with mixed data types (numbers and strings) in MongoDB can lead to unexpected results.

**Bug Description:**

When sorting on a field that contains both numerical and string values, the sorting order becomes unpredictable.  This is because MongoDB's sorting mechanism doesn't handle mixed types consistently, potentially placing strings before or after numbers in ways that don't reflect their numerical or lexicographical order.

**Reproduction Steps:**

1.  Run the `bug.js` script. This script connects to a MongoDB database, inserts some documents with a mix of number and string values for the 'age' field, and then attempts to sort the documents based on the 'age' field.
2.  Observe the output. You'll notice that the sorting order is not as expected based on numerical or string comparison.

**Solution:**

The `bugSolution.js` script provides a solution by ensuring type consistency before sorting. It does so by converting the 'age' field to numbers before the sorting operation. This approach will prevent unexpected sorting behavior.