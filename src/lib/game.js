
export function createNew(width, height, bombsCount) {
    const cells = []
    for (let i = 0; i < width * height; i++) {
        cells.push({ isHidden: true })
    }

    for (let i = 0; i < bombsCount; i++) {
        cells[i].isBomb = true
    }
    cells.sort(() => Math.random() - Math.random()) // Poors man's shuffle.

    for (let i = 1; i <= cells.length; i++) {
        cells[i - 1].id = i

    }

    return cells
}

export function checkStatus(cells) {
    const [uncoveredBombs, pendingBombs, pendingCells] = cells.reduce(
        ([ub, pb, pc], cell) => {
            if (!cell.isHidden && cell.isBomb) {
                return [ub +1, pb, pc]
            }
            if (!cell.hasFlag && cell.isBomb) {
                return [ub, pb + 1, pc]
            }
            if (!cell.isBomb && cell.isHidden) {
                return [ub, pb, pc + 1]
            }
            return [ub, pb, pc]
        }, [0, 0, 0])

    if (uncoveredBombs > 0) {
        return 'lost'
    }
    if (pendingBombs === 0 && pendingCells === 0) {
        return 'win'
    }
    return 'running'
}

export function stepInto(cellId, game) {
    const cell = get(game, cellId)
    cell.isHidden = false
    if (!cell.isBomb) {
        uncoverNearby(cell, game)
    }
    return game.cells
}

export function toggleFlag(cellId, game) {
    const cell = get(game, cellId)
    cell.hasFlag = !cell.hasFlag
    return game.cells
}

function uncoverNearby(cell, game) {
    cell.isHidden = false
    cell.hasFlag = false
    const nearby = getNearby(cell.id, game)
    const bombs = nearby.filter(({ isBomb }) => isBomb).length
    cell.bombsNearby = bombs
    if (bombs === 0) {
        for (const cell of nearby.filter(({isHidden}) => isHidden)) {
            /* Minesweeper search is naturally recursive, but this
               implementation could be better. */
            uncoverNearby(cell, game)
        }
    }
}

function getNearby(id, game) {
    const { width } = game
    const nearby = []
    const getAt = get.bind(undefined, game)

    if (id % width !== 1) {
        nearby.push(
            getAt(id - 1 + width),
            getAt(id - 1),
            getAt(id - 1 - width)
        )
    }
    if (id % width !== 0) {
        nearby.push(
            getAt(id + 1 - width),
            getAt(id + 1),
            getAt(id + 1 + width)
        )
    }
    return [
        ...nearby,
        getAt(id - width),
        getAt(id + width),
    ].filter(cell => cell !== undefined)
}

function get(game, id) {
    return game.cells[id - 1]
}