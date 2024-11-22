# Mistakes that I generally make while coding:
    - sometimes while finding the index for something by using the remainder operator I use something like `(val % n) - 1` where I should rather be using `((val % n) || n - 1)` to avoid the value of -1.
    