export const DEFAULT_GRIDS = {
    blank: {
        0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    jazz: {
        0: [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        1: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        2: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        3: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        4: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
};
export const DEFAULT_CONTROLS = {
    tempo: 100,
    variation: 10,
    loopLength: 2
};
export const DEFAULT_LOCKS = {
    controls: {
        tempo: false,
        variation: false,
        loopLength: false
    },
    grid: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
    }
};

export const marks = [
    {
        value: 40,
        label: '40',
    },
    {
        value: 60,
        label: '60',
    },
    {
        value: 80,
        label: '80',
    },
    {
        value: 100,
        label: '100',
    },
    {
        value: 120,
        label: '120',
    },
    {
        value: 140,
        label: '140',
    },
    {
        value: 160,
        label: '160',
    },
    {
        value: 180,
        label: '180',
    },
    {
        value: 200,
        label: '200',
    }
];

export const varMarks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 20,
        label: '20%',
    },
    {
        value: 40,
        label: '40%',
    },
    {
        value: 60,
        label: '60%',
    },
    {
        value: 80,
        label: '80%',
    },
    {
        value: 100,
        label: '100%',
    }
];

export const lengthMarks = [
    {
        value: 2,
        label: '2',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 8,
        label: '8',
    }
];
