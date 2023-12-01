VENV = back/.venv
MODULE = builder
SRC = back/src

$(VENV): $(SRC)/setup.cfg $(SRC)/pyproject.toml
	python3 -m venv $(VENV)
	$(VENV)/bin/pip install -e $(SRC)[dev]
	touch $(VENV)

.PHONY: run-builder
run-builder: $(VENV)
	$(VENV)/bin/python3 $(MODULE)/main.py

.PHONY: build-image
build-image: back/Dockerfile
	docker build --platform linux/amd64 -t docker-image:test back

.PHONY: start-container
start-container: build-image
	# docker run --name Resume_Builder --platform linux/amd64 -p 9000:8080 docker-image:test &
	docker run --name Resume_Builder --platform linux/amd64 -d -v ~/.aws-lambda-rie:/aws-lambda -p 9000:8080 --entrypoint /aws-lambda/aws-lambda-rie docker-image:test /usr/bin/python -m awslambdaric create_pdf.lambda_handler

.PHONY: test-builder
test-builder: $(VENV)
	$(VENV)/bin/python3 -m unittest discover -v -s $(SRC)/test

.PHONY: test-lambdas
test-lambdas: $(VENV)
	cd back && ../$(VENV)/bin/python3 -m unittest discover -v

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
