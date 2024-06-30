// import { colorCombinations } from '../color/wada'
import { pickRandom, random } from '../random'

// select a random color palette from your favorites
const selectedWada = [
    121, 124, 125, 126, 127, 128, 131, 132, 135, 137, 139, 140, 143, 144, 147, 149, 151, 155, 161, 162, 166, 167, 169,
    171, 175, 178, 180, 182, 183, 184, 185, 187, 189, 190, 192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 207,
    208, 209, 211, 214, 216, 217, 218, 219, 221, 223, 224, 225, 226, 227, 229, 230, 231, 232, 234, 235, 238, 240, 241,
    242, 243, 244, 249, 252, 253, 254, 255, 256, 258, 259, 260, 261, 262, 263, 264, 268, 271, 272, 273, 275, 276, 279,
    281, 284, 284, 285, 288, 290, 292, 294, 296, 300, 302, 303, 304, 309, 310, 317, 318, 319, 320, 321, 323, 324, 325,
    328, 329, 330, 332, 336, 339, 340, 341, 343,
]

const palettes = [
    // Blue Boy
    {
        background: '#e4dcc3',
        primary: '#bc5037',
        secondary: '#48667e',
        accent: '#7a9ec0',
        dark: '#294962',
        neutral: '#dc9476',
    },

    // 70s Magazine Cover
    {
        background: '#eadfce',
        primary: '#5a95bb',
        secondary: '#fcbe43',
        accent: '#F75D30',
        dark: '#444347',
        neutral: '#85796d',
    },

    // Color Class Palette
    {
        background: '#f4e9db',
        primary: '#ed6249',
        secondary: '#3a7cb0',
        accent: '#eeb853',
        dark: '#232429',
        neutral: '#c9b7a1',
    },

    {
        background: '#e0e4cc',
        primary: '#f38630',
        secondary: '#a7dbd8',
        accent: '#fa6900',
        dark: '#343434',
        neutral: '#69d2e7',
    },
    {
        background: '#83af9b',
        primary: '#fe4365',
        secondary: '#fc9d9a',
        accent: '#c8c8a9',
        dark: '#343434',
        neutral: '#f9cdad',
    },
    {
        background: '#fdfcdc',
        primary: '#0081a7',
        secondary: '#00afb9',
        accent: '#f07167',
        dark: '#343434',
        neutral: '#fed9b7',
    },
    {
        background: '#f1ebdf',
        primary: '#5fc1b2',
        secondary: '#dcdcdc',
        accent: '#000000',
        dark: '#343434',
        neutral: '#decba5',
    },
    {
        background: '#e8ddcb',
        primary: '#036564',
        secondary: '#cdb380',
        accent: '#033649',
        dark: '#343434',
        neutral: '#031634',
    },
    {
        background: '#add9f4',
        primary: '#476c9b',
        secondary: '#468c98',
        accent: '#984447',
        dark: '#343434',
        neutral: '#101419',
    },
    {
        background: '#3e4147',
        primary: '#fffedf',
        secondary: '#dfba69',
        accent: '#2a2c31',
        dark: '#343434',
        neutral: '#5a2e2e',
    },
    {
        background: '#2a363b',
        primary: '#99b898',
        secondary: '#fecea8',
        accent: '#ff847c',
        dark: '#e84a5f',
        neutral: '#343434',
    },
    {
        background: '#e5d9d3',
        primary: '#4b8e8d',
        secondary: '#f7c1bb',
        accent: '#d9455f',
        dark: '#2e2e2e',
        neutral: '#a59b85',
    },
    {
        background: '#f4ece2',
        primary: '#3a506b',
        secondary: '#ffcc00',
        accent: '#5bc0be',
        dark: '#1c2541',
        neutral: '#d8e2dc',
    },
    {
        background: '#e9e7df',
        primary: '#d25b43',
        secondary: '#d28144',
        accent: '#568541',
        dark: '#1a1a1a',
        neutral: '#4068af',
    },
]

// const selectedPalette = palettes[0]
const randomPalette = () => pickRandom(palettes)
const selectedPalette = randomPalette()
console.log('selected palette', selectedPalette)

export { selectedPalette, randomPalette }
