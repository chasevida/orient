test:
	@node node_modules/lab/bin/lab
test-cov:
	@node node_modules/lab/bin/lab -t 100
test-cov-html:
	@node node_modules/lab/bin/lab -r html -o coverage.html
test-coveralls:
	@node node_modules/lab/bin/lab -t 100 -r lcov | ./node_modules/coveralls/bin/coveralls.js

.PHONY: test test-cov test-cov-html test-coveralls