update:
	git pull
	yarn install
	yarn build
	pm2 restart all