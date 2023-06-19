import { Configuration } from "./Configuration";

let config = new Configuration("./hoppers/hoppers-3.txt");

for (let neighbor of config.getNeighbors().values()) {
    neighbor.printConfig();
}

const solve = (configuration: Configuration): Configuration[] => {
    let predecessors = new Map<Configuration, Configuration | null>();
    let queue: Configuration[] = [];
    let path: Configuration[] = [];
    queue.push(configuration);
    predecessors.set(configuration, null);

    while(queue.length !== 0) {
        let node: Configuration = queue.shift() as Configuration;

        if (node.isSolution()) {
            let end: Configuration = node;

            if (predecessors.has(end)) {
                let currConfig: Configuration = end;
                while(currConfig !== configuration) {
                    path.push(currConfig);
                    currConfig = predecessors.get(currConfig) as Configuration;
                }
                path.push(configuration);
            }
            break;
        } else {
            for (let neighbor of node.getNeighbors().values()) {
                if (!predecessors.has(neighbor)) {
                    predecessors.set(neighbor, node);
                    queue.push(neighbor);
                }
            }
        }
    }
    return path;
}

let answer = solve(config);

for (let route of answer) {
    // route.printConfig();
    // console.log(" ");
}
