VENV = .venv
MODULE = builder
SRC = back

$(SRC)/$(VENV): $(SRC)/setup.cfg
	python3 -m venv $(SRC)/$(VENV)
	$(SRC)/$(VENV)/bin/pip install -e $(SRC)
	touch $(SRC)/$(VENV)

.PHONY: run-builder
run-builder: $(SRC)/$(VENV)
	cd $(SRC) && $(VENV)/bin/python3 $(MODULE)/main.py

.PHONY: test
test: $(SRC)/$(VENV)
	cd $(SRC) && $(VENV)/bin/python3 -m unittest discover test

.PHONY: lint
lint: $(SRC)/$(VENV)
	-$(SRC)/$(VENV)/bin/flake8 --exclude $(SRC)/$(VENV)

.PHONY: run-dev
run-dev:
	npm install --prefix front
	npm run dev --prefix front

.PHONY: clean
clean:
	rm -rf $(SRC)/$(VENV)
	find . -type d -name __pycache__ -exec rm -rf {} +
	rm -rf .pytest_cache
	rm -rf *.eggs
	rm -rf *.egg
	rm -rf *.egg-info
	rm -f lib/resume.*
	