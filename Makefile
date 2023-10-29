VENV = .venv
MODULE = builder

$(VENV): setup.cfg
	python3 -m venv $(VENV)
	# $(VENV)/bin/pip install -e $(MODULE)[dev]
	$(VENV)/bin/pip install -e .
	touch $(VENV)

.PHONY: run-builder
run-builder: $(VENV)
	$(VENV)/bin/python3 $(MODULE)/main.py

.PHONY: run-dev
run-dev:
	npm run dev --prefix app/resume-builder

.PHONY: test
test: $(VENV)
	$(VENV)/bin/python3 -m unittest discover test

.PHONY: lint
lint: $(VENV)
	-$(VENV)/bin/flake8 --exclude $(VENV)

.PHONY: clean
clean:
	rm -rf $(VENV)
	find . -type d -name __pycache__ -exec rm -rf {} +
	rm -rf .pytest_cache
	rm -rf *.eggs
	rm -rf *.egg
	rm -rf *.egg-info
	rm -f lib/resume.*
	