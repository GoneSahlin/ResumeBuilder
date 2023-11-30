VENV = back/.venv
MODULE = builder
SRC = back/src

$(VENV): $(SRC)/setup.cfg
	python3 -m venv $(VENV)
	$(VENV)/bin/pip install -e $(SRC)[dev]
	touch $(VENV)

.PHONY: run-builder
run-builder: $(VENV)
	$(VENV)/bin/python3 $(MODULE)/main.py

.PHONY: build-image
build-image: back/Dockerfile
	docker build --platform linux/amd64 -t docker-image:test back

.PHONY: test
test: $(VENV)
	$(VENV)/bin/python3 -m unittest discover -v -s $(SRC)/test

.PHONY: lint
lint: $(VENV)
	-$(VENV)/bin/flake8 $(SRC) --exclude $(SRC)/$(VENV)

.PHONY: format
format: $(VENV)
	$(VENV)/bin/black $(SRC)

.PHONY: run-dev
run-dev:
	npm install --prefix front
	npm run dev --prefix front

.PHONY: clean
clean:
	rm -rf $(VENV)
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name '*.egg-info' -exec rm -rf {} +
