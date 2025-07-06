export const keysetOptions = {
    leftHand: {
        id: 'left-hand',
        title: 'Left hand on home row',
        responseKeys: ['a', 's', 'd', 'f'],
        triggerKey: 'space',
    },
    rightHand: {
        id: 'right-hand',
        title: 'Right hand on home row',
        responseKeys: ['h', 'j', 'k', 'l'],
        triggerKey: 'space',
    },
};

let chosenKeyset = keysetOptions.leftHand;

export const getChosenKeyset = () => chosenKeyset;

export const setChosenKeyset = (keyset) => {
    chosenKeyset = keyset;
};
