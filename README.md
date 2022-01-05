Контейнер для тестов (а то несовместимость у node и npm была):
```
docker run --workdir=/home --volume ${PWD}:/home --rm -it node:lts-alpine sh
```
Команды для запуска
```
npm install
./node_modules/mocha/bin/mocha --exclude=/node_modules --exit **/*.test.js
```

