VENV = .venv
MODULE = builder
SRC = back/src

$(SRC)/$(VENV): $(SRC)/setup.cfg
	python3 -m venv $(SRC)/$(VENV)
	$(SRC)/$(VENV)/bin/pip install -e $(SRC)[dev]
	touch $(SRC)/$(VENV)

.PHONY: run-builder
run-builder: $(SRC)/$(VENV)
	cd $(SRC) && $(VENV)/bin/python3 $(MODULE)/main.py

.PHONY: build-image
build-image: $(SRC)/Dockerfile
	docker build --platform linux/amd64 -t docker-image:test $(SRC)

.PHONY: test
test: $(SRC)/$(VENV)
	cd $(SRC) && $(VENV)/bin/python3 -m unittest discover test -v

.PHONY: lint
lint: $(SRC)/$(VENV)
	-$(SRC)/$(VENV)/bin/flake8 $(SRC) --exclude $(SRC)/$(VENV)

.PHONY: format
format: $(SRC)/$(VENV)
	$(SRC)/$(VENV)/bin/black $(SRC)

.PHONY: run-dev
run-dev:
	npm install --prefix front
	npm run dev --prefix front

.PHONY: clean
clean:
	rm -rf $(SRC)/$(VENV)
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name '*.egg-info' -exec rm -rf {} +
