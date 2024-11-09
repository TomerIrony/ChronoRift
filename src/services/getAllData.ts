import season_1 from '../data/season_1.json'
import season_2 from '../data/season_2.json'
import season_3 from '../data/season_3.json'
import season_4 from '../data/season_4.json'
import season_5 from '../data/season_5.json'
import season_6 from '../data/season_6.json'
import season_7 from '../data/season_7.json'


export const getAllData = () => {
    return [
        ...season_1,
        ...season_2,
        ...season_3,
        ...season_4,
        ...season_5,
        ...season_6,
        ...season_7
    ]
}