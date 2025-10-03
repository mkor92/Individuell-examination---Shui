SLS = npx serverless
STAGE ?= prod
BUCKET ?= shui-board-g-mk

.PHONY: deploy-backend remove-backend build-frontend deploy-frontend env all

deploy-backend:
	cd backend && npm i && $(SLS) deploy --stage $(STAGE)

remove-backend:
	cd backend && $(SLS) remove --stage $(STAGE)

build-frontend:
	cd frontend && cp -n .env.example .env || true && npm i && npm run build

deploy-frontend:
	aws s3 mb s3://$(BUCKET) || true
	aws s3 website s3://$(BUCKET) --index-document index.html
	aws s3 sync frontend/dist/ s3://$(BUCKET) --delete
	@echo "Website endpoint: http://$(BUCKET).s3-website.eu-north-1.amazonaws.com"

env:
	@echo "Set VITE_API_BASE_URL in frontend/.env to your API URL"

all: deploy-backend build-frontend deploy-frontend
