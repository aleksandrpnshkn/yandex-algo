const reader = require('readline')
    .createInterface({
        input: process.stdin,
    });

let placesQty;
let bridgesQty;
const bridgesList = [];

reader.once('line', (params) => {
    [placesQty, bridgesQty] = params.split(' ').map(Number);

    let currBridge = 0;

    reader.on('line', (bridge) => {
        currBridge++;

        if (currBridge > bridgesQty) {
            return;
        }

        bridgesList.push(bridge.split(' ').map(Number));
    });
});

process.stdin.on('end', solve);

function solve() {
    const bridgesAdjacencyList = [];

    bridgesList.forEach(([fromPlace, toPlace, distance]) => {
        if (bridgesAdjacencyList[fromPlace] === undefined) {
            bridgesAdjacencyList[fromPlace] = [];
        }

        if (bridgesAdjacencyList[toPlace] === undefined) {
            bridgesAdjacencyList[toPlace] = [];
        }

        bridgesAdjacencyList[fromPlace].push({
            toPlace,
            distance,
        });

        bridgesAdjacencyList[toPlace].push({
            toPlace: fromPlace,
            distance,
        });
    });

    const distanceMatrix = new Array(placesQty);

    for (let i = 0; i < placesQty; i++) {
        distanceMatrix[i] = new Array(placesQty);
        distanceMatrix[i].fill(-1);
        distanceMatrix[i][i] = 0;
    }

    for (let fromPlace = 1; fromPlace < bridgesAdjacencyList.length; fromPlace++) {
        dijkstra(fromPlace);
    }

    function dijkstra(rootPlace) {
        const distances = new Array(placesQty + 1);
        distances.fill(Infinity);
        distances[rootPlace] = 0;

        const visited = new Array(placesQty + 1);
        visited.fill(false);

        function getNearestNotVisitedPlace() {
            let minDistance = Infinity;
            let nearestNotVisitedPlace;

            distances.forEach((distance, place) => {
                if (visited[place] || place === 0) {
                    return;
                }

                if (distance < minDistance) {
                    minDistance = distance;
                    nearestNotVisitedPlace = place;
                }
            });

            return nearestNotVisitedPlace;
        }

        while (true) {
            const fromPlace = getNearestNotVisitedPlace();

            if (fromPlace === undefined) {
                break;
            }

            if (visited[fromPlace]) {
                continue;
            }

            visited[fromPlace] = true;

            const bridges = bridgesAdjacencyList[fromPlace] || [];

            bridges.forEach((bridge) => {
                if (visited[bridge.toPlace]) {
                    return;
                }

                distances[bridge.toPlace] = Math.min(distances[fromPlace] + bridge.distance, distances[bridge.toPlace]);

                distanceMatrix[rootPlace - 1][bridge.toPlace - 1] = distances[bridge.toPlace];
            });
        }
    }

    distanceMatrix.forEach((row) => process.stdout.write(row.join(' ') + '\n'));
}
