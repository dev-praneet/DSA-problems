/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // can finish the course if there exists a possible topological sort order

  const coursesRequiredToComplete = Array.from(
    { length: numCourses },
    () => new Set()
  );
  const coursesThatRequire = Array.from(
    { length: numCourses },
    () => new Set()
  );

  for (const [second, first] of prerequisites) {
    coursesRequiredToComplete[second].add(first);
    coursesThatRequire[first].add(second);
  }

  const canTakeCourses = [];
  const remainingCourses = new Set(
    Array.from({ length: numCourses }, (_, index) => index)
  );

  for (let course = 0; course < numCourses; course++) {
    if (coursesRequiredToComplete[course].size === 0) {
      canTakeCourses.unshift(course);
      remainingCourses.delete(course);
    }
  }

  while (canTakeCourses.length) {
    const selectedCourse = canTakeCourses.pop();

    for (const course of coursesThatRequire[selectedCourse]) {
      coursesRequiredToComplete[course].delete(selectedCourse);

      if (coursesRequiredToComplete[course].size === 0) {
        canTakeCourses.unshift(course);
        remainingCourses.delete(course);
      }
    }
  }

  return !remainingCourses.size;
};


// Another solution using DFS
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  // can finish the course if there exists a possible topological sort order

  const adjNodes = Array.from({ length: numCourses }, () => new Set());

  for (const [second, first] of prerequisites) {
    adjNodes[first].add(second);
  }

  const discovered = Array.from({ length: numCourses }, () => false);
  const processed = Array.from({ length: numCourses }, () => false);

  const entryTime = Array.from({ length: numCourses }, () => null);
  const exitTime = Array.from({ length: numCourses }, () => null);

  let time = 0;
  let isBackEdgePresent = false;

  function dfs(node) {
    if (isBackEdgePresent) {
      return;
    }

    discovered[node] = true;
    time += 1;
    entryTime[node] = time;

    for (const neighbour of adjNodes[node]) {
      if (!discovered[neighbour]) {
        dfs(neighbour);
      } else {
        if (!processed[neighbour]) {
          isBackEdgePresent = true;
          return;
        }
      }
    }

    processed[node] = true;
    time += 1;
    exitTime[node] = time;
  }

  for (let i = 0; i < numCourses; i++) {
    if (discovered[i]) {
      continue;
    }

    dfs(i);
  }

  return !isBackEdgePresent;
};

