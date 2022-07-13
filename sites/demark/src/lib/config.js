const config = {
    siteName: process.env.VUE_APP_SITE_NAME,
    pageSize: parseInt(process.env.VUE_APP_PAGE_SIZE),
    pageLimit: parseInt(process.env.VUE_APP_PAGE_LIMIT),
    gamePageSize: parseInt(process.env.VUE_APP_GAME_PAGE_SIZE),
    sportsMaxRate: parseInt(process.env.VUE_APP_SPORTS_MAX_RATE),
    sportsMaxFolder: parseInt(process.env.VUE_APP_SPORTS_MAX_FOLDER),
    powerballTerm: parseInt(process.env.VUE_APP_POWERBALL_TIME),
    powerladderTerm: parseInt(process.env.VUE_APP_POWERLADDER_TIME),
    kenoladderTerm: parseInt(process.env.VUE_APP_KENOLADDER_TIME),
    boglePowerballTerm: parseInt(process.env.VUE_APP_BOGLEPOWERBALL_TIME),
    bogleladderTerm: parseInt(process.env.VUE_APP_BOGLELADDER_TIME),
    googlePowerball1Term: parseInt(process.env.VUE_APP_GOOGLEPOWERBALL1_TIME),
    googlePowerball3Term: parseInt(process.env.VUE_APP_GOOGLEPOWERBALL3_TIME),
    eosPowerballTerm: parseInt(process.env.VUE_APP_EOSPOWERBALL_TIME),
    statusCharge: ['확인 중', '입금 완료', '입금 취소'],
    statusChargeClass: ['', 'text-green', 'text-orange'],
    statusExchange: ['확인 중', '출금 완료', '출금 취소'],
    statusExchangeClass: ['', 'text-green', 'text-orange'],
    helpStatus: {
        true: '답변 완료',
        false: '답변 대기'
    },
    helpStatusClass: {
        true: 'text-green',
        false: ''
    },
    sport: {
        'Football': '축구',
        'Basketball': '농구',
        'Baseball': '야구',
        'Ice Hockey': '아이스하키',
        'Tennis': '테니스',
        'Handball': '핸드볼',
        'Volleyball': '배구',
        'Rugby League': '럭비',
        'Rugby Union': '럭비유니온',
        'Boxing': '권투',
        'Table Tennis': '탁구',
        'MMA': '이종격투기',
        'Golf': '골프',
        'Darts': '다트',
        'LoL': 'LOL',
        'CS:GO': 'CS:GO',
        'Dota 2': '도타2',
        'FIFA': '피파'
    },
    iconSport: {
        'Football': 'icon-football-gray.png',
        'Basketball': 'icon-basketball-gray.png',
        'Baseball': 'icon-baseball-gray.png',
        'Ice Hockey': 'icon-icehockey-gray.png',
        'Tennis': 'icon-tennis-gray.png',
        'Handball': 'icon-handball-gray.png',
        'Volleyball': 'icon-volleyball-gray.png',
        'Rugby League': 'icon-rugby-gray.png',
        'Rugby Union': 'icon-rugbyunion-gray.png',
        'Boxing': 'icon-boxing-gray.png',
        'Table Tennis': 'icon-tabletennis-gray.png',
        'MMA': 'icon-mma-gray.png',
        'Golf': 'icon-golf-gray.png',
        'Darts': 'icon-darts-gray.png',
        'LoL': 'icon-lol-gray.png',
        'CS:GO': 'icon-csgo-gray.png',
        'Dota 2': 'icon-dota2-gray.png',
        'FIFA': 'icon-fifa-gray.png'
    },
    iconCountry: {
        '국제 경기': "601d53112f69fe47f67abb3a",
        '국제경기': "5fbe8034021de046373b2c54",
        '뉴질랜드': "5ed7b2bc2539b5113c79df86",
        '대만': "5e7bd44340d39b43488b4c46",
        '대한민국': "5eb5b24422f94b1a2c65c885",
        '말레이시아': "5f4108eddece3f12e04ce78d",
        '말리': "5f410862dece3f12e04ce786",
        '멕시코': "5f18db8d01a10c1bfc99ffd0",
        '모로코': "5ec51008c37d4e1618a53af4",
        '미국': "60916d3b6703c077d7d73913",
        '베트남': "5ec560f4af6477181c74623d",
        '볼리비아': "5fb3961e9850d847723e1ff1",
        '부탄': "5f24fc0901a10c1bfc9a4e27",
        '브라질': "5eb931d188ad6a1a6c11855f",
        '스웨덴': "5ee4a45ed338da11e43770ab",
        '싱가포르': "5f8a246e5dbf920fd5a1c54d",
        '아르헨티나': "5fb3961d9850d847723e1fef",
        '아이슬란드': "5ed8b9412539b5113c79e44c",
        '에콰도르': "5f35b85701352109f8a40130",
        '요르단': "5f15a8ef01a10c1bfc99edbc",
        '우즈베키스탄': "5ee40eead338da11e4376c8a",
        '월드': "5eba64683fb3e505b86116a2",
        '이집트': "5f2af3ea01a10c1bfc9a70b8",
        '일본': "5ed508b02539b5113c79d017",
        '중국': "5eb8cdc4d744ec1a5870cf72",
        '칠레': "5f4931c103422118d8a27b83",
        '캄보디아': "5efa1b5bafd3840bc077fb2b",
        '코스타리카': "5ec51009c37d4e1618a53b23",
        '클럽친선': "5e7f52e4ea48d13eb07a7073",
        '파라과이': "5f10b1e001a10c1bfc99ce90",
        '필리핀': "5f816c3023f8242b7b1c8554",
        '호주': "5eec99b3c2999b0ec0caffe1",
        '스코틀랜드': '5f24013701a10c1bfc9a455b',
        '콜롬비아': '5f3bdfa4b5258615ecd0c75b'
    },
    convertBetTypeSports: {
        x: '승무패',
        xDouble: '더블찬스',
        threeWayHandicap: '승무패 핸디캡',
        handicap: '핸디캡',
        handicapTotalSet: '핸디캡',
        underOver: '언더오버',
        underOverTotalSet: '언더오버',
        oddEvenFullTime: '풀타임 홀짝',
        x1stInning: '1이닝 승무패',
        handicap1stInning: '1이닝 핸디캡',
        underOver1stInning: '1이닝 언더오버',
        x2ndInning: '2이닝 승무패',
        handicap2ndInning: '2이닝 핸디캡',
        underOver2ndInning: '2이닝 언더오버',
        x3rdInning: '3이닝 승무패',
        handicap3rdInning: '3이닝 핸디캡',
        underOver3rdInning: '3이닝 언더오버',
        x4thInning: '4이닝 승무패',
        handicap4thInning: '4이닝 핸디캡',
        underOver4thInning: '4이닝 언더오버',
        x5thInning: '5이닝 승무패',
        handicap5thInning: '5이닝 핸디캡',
        underOver5thInning: '5이닝 언더오버',
        x6thInning: '6이닝 승무패',
        handicap6thInning: '6이닝 핸디캡',
        underOver6thInning: '6이닝 언더오버',
        x7thInning: '7이닝 승무패',
        handicap7thInning: '7이닝 핸디캡',
        underOver7thInning: '7이닝 언더오버',
        x8thInning: '8이닝 승무패',
        handicap8thInning: '8이닝 핸디캡',
        underOver8thInning: '8이닝 언더오버',
        x9thInning: '9이닝 승무패',
        handicap9thInning: '9이닝 핸디캡',
        underOver9thInning: '9이닝 언더오버',
        x1stSet: '1세트 승무패',
        handicap1stSet: '1세트 핸디캡',
        underOver1stSet: '1세트 언더오버',
        oddEven1stSet: '1세트 홀짝',
        x1stPeriod: '1피리어드 승무패',
        handicap1stPeriod: '1피리어드 핸디캡',
        underOver1stPeriod: '1피리어드 언더오버',
        x2ndPeriod: '2피리어드 승무패',
        handicap2ndPeriod: '2피리어드 핸디캡',
        underOver2ndPeriod: '2피리어드 언더오버',
        x3rdPeriod: '3피리어드 승무패',
        handicap3rdPeriod: '3피리어드 핸디캡',
        underOver3rdPeriod: '3피리어드 언더오버',
        x1stQuarter: '1쿼터 승무패',
        handicap1stQuarter: '1쿼터 핸디캡',
        underOver1stQuarter: '1쿼터 언더오버',
        oddEven1stQuarter: '1쿼터 홀짝',
        x2ndQuarter: '2쿼터 승무패',
        handicap2ndQuarter: '2쿼터 핸디캡',
        underOver2ndQuarter: '2쿼터 언더오버',
        oddEven2ndQuarter: '2쿼터 홀짝',
        x3rdQuarter: '3쿼터 승무패',
        handicap3rdQuarter: '3쿼터 핸디캡',
        underOver3rdQuarter: '3쿼터 언더오버',
        oddEven3rdQuarter: '3쿼터 홀짝',
        x4thQuarter: '4쿼터 승무패',
        handicap4thQuarter: '4쿼터 핸디캡',
        underOver4thQuarter: '4쿼터 언더오버',
        oddEven4thQuarter: '4쿼터 홀짝',
        x1stHalf: '전반전 승무패',
        handicap1stHalf: '전반전 핸디캡',
        underOver1stHalf: '전반전 언더오버',
        oddEven1stHalf: '전반전 홀짝',
        xFirst5Innings: '첫 5이닝 승무패',
        underOverFirst5Innings: '첫 5이닝 언더오버',
        x2ndHalf: '후반전 승무패',
        handicap2ndHalf: '후반전 핸디캡',
        underOver2ndHalf: '후반전 언더오버',
        oddEven2ndHalf: '후반전 홀짝',
        bothTeamScore: '양팀득점',
        bothTeamsGoalWin: '양팀득점+승무패',
        bothTeamsGoalWinOrDraw: '양팀득점+더블찬스',
        firstScoreTeam: '첫골 팀',
        firstRun: '첫득점 팀',
        lastScoreTeam: '마지막골 팀',
        lastRun: '마지막 득점 팀',
        halfWithMostScore: '최다골 시점',
        correctScoreFullTime: '정확한 점수',
        xWithUnderOver: '승무패 언더오버',
        first7Points: '선 7득점',
        first5Points: '선 5득점',
        run1stInning: '1이닝 득점/무득점',
        firstHomer: '첫 홈런',
        first2Points: '첫 2점슛',
        first3Points: '첫 3점슛',
        firstFreeThrow: '첫 자유투',
        handicap1stQuarterSpecial: '1쿼터 핸디캡',
        underOver1stQuarterSpecial: '1쿼터 언더오버',
        handicapFirst5InningsSpecial: '5이닝 핸디캡',
        underOverFirst5InningsSpecial: '5이닝 언더오버',
        firstWalk: '첫볼넷',
        handicap1stSetSpecial: '1세트 핸디캡',
        underOver1stSetSpecial: '1세트 언더오버',
        handicap1stPeriodSpecial: '1피리어드 핸디캡',
        underOver1stPeriodSpecial: '1피리어드 언더오버',
        firstPoint: '첫득점 팀',
        x1stSetSpecial: '1세트 승패',
        handicap1stSetKill: '1세트 핸디캡(킬)',
        underOver1stSetKill: '1세트 언더오버(킬)',
        firstTower1stSet: '1세트 첫타워',
        firstDragon1stSet: '1세트 첫용',
        firstBlood1stSet: '1세트 첫킬',
        handicap2ndQuarterSpecial: '2쿼터 핸디캡',
        underOver2ndQuarterSpecial: '2쿼터 언더오버',
        handicap3rdQuarterSpecial: '3쿼터 핸디캡',
        underOver3rdQuarterSpecial: '3쿼터 언더오버',
        handicap4thQuarterSpecial: '4쿼터 핸디캡',
        underOver4thQuarterSpecial: '4쿼터 언더오버',
        handicap2ndSetSpecial: '2세트 핸디캡',
        underOver2ndSetSpecial: '2세트 언더오버',
        handicap3rdSetSpecial: '3세트 핸디캡',
        underOver3rdSetSpecial: '3세트 언더오버'
    },
    convertBetStandard: {
        firstTeamWin: '홈',
        secondTeamWin: '원',
        firstTeamWinOrDraw: '홈/무',
        firstTeamWinOrSecondTeamWin: '홈/원',
        secondTeamWinOrDraw: '원/무',
        homeWin: '홈',
        draw: '무',
        awayWin: '원',
        homeWinOrDraw: '홈/무',
        homeWinOrAway: '홈/원',
        awayWinOrDraw: '원/무'
    },
    convertBetSelectSports: {
        home: '홈',
        draw: '무',
        away: '원',
        homeDraw: '홈/무',
        homeAway: '홈/원',
        awayDraw: '원/무',
        under: '언더',
        over: '오버',
        odd: '홀',
        even: '짝',
        yes: '예',
        no: '아니오',
        neither: '노골',
        half1st: '전반전',
        drawEqualNumber: '같음',
        half2nd: '후반전'
    },
    convertSportsGameType: {
        sports: '해외형 스포츠',
        sportsCross: '국내형 크로스',
        sportsLive: '라이브 스포츠',
        sportsSpecial: '스페셜 스포츠',
        sportsLiveKor: '실시간 스포츠'
    },
    result: {
        I: '진행중',
        W: '적중',
        L: '미적중',
        N: '적특',
        C: '취소'
    },
    sportsResultBadgeColor: {
        I: 'text-light',
        W: 'text-green',
        L: 'text-pink',
        N: 'text-light-brown',
        C: 'text-pink'
    },
    sportsResultTextColor: {
        I: '',
        W: 'text-green',
        L: 'text-pink',
        N: 'text-light-brown',
        C: 'text-pink'
    },
    specialGameType: [
        'first2Points',
        'first3Points',
        'firstFreeThrow',
        'first7Points',
        'firstWalk',
        'run1stInning',
        'firstHomer',
        'first5Points',
        'firstPoint',
        'firstTower1stSet',
        'firstDragon1stSet',
        'firstBlood1stSet'
    ],
    convertBetStandardXwithUnderOver(v) {
        return v.replace(/homeUnder/gi, '홈/언')
                .replace(/homeOver/gi, '홈/오')
                .replace(/drawUnder/gi, '무/언')
                .replace(/drawOver/gi, '무/오')
                .replace(/awayUnder/gi, '원/언')
                .replace(/awayOver/gi, '원/오')
                .replace(/-/gi, '/')
    },
    convertBetSelectMinigames: {
        PWBPOE: {
            Odd: '파워볼 [홀]',
            Even: '파워볼 [짝]'
        },
        PWBPUO: {
            Under: '파워볼 [언더]',
            Over: '파워볼 [오버]'
        },
        PWBPCOMBO: {
            OddUnder: '파워볼 [홀+언더]',
            EvenUnder: '파워볼 [짝+언더]',
            OddOver: '파워볼 [홀+오버]',
            EvenOver: '파워볼 [짝+오버]'
        },
        PWBNOE: {
            Odd: '일반볼 [홀]',
            Even: '일반볼 [짝]'
        },
        PWBNUO: {
            Under: '일반볼 [언더]',
            Over: '일반볼 [오버]'
        },
        PWBBMS: {
            Big: '일반볼 [대]',
            Middle: '일반볼 [중]',
            Small: '일반볼 [소]'
        },
        PWBNCOMBO: {
            OddUnder: '일반볼 [홀+언더]',
            EvenUnder: '일반볼 [짝+언더]',
            OddOver: '일반볼 [홀+오버]',
            EvenOver: '일반볼 [짝+오버]'
        },
        PWBBMSCOMBO: {
            OddBig: '일반볼 [홀+대]',
            OddMiddle: '일반볼 [홀+중]',
            OddSmall: '일반볼 [홀+소]',
            EvenBig: '일반볼 [짝+대]',
            EvenMiddle: '일반볼 [짝+중]',
            EvenSmall: '일반볼 [짝+소]'
        },
        PLDOE: {
            Odd: '파워 사다리 [홀]',
            Even: '파워 사다리 [짝]'
        },
        PLDLR: {
            Left: '파워 사다리 [좌]',
            Right: '파워 사다리 [우]'
        },
        PLDTF: {
            Three: '파워 사다리 [3줄]',
            Four: '파워 사다리 [4줄]'
        },
        PLDCOMBO: {
            LeftThree: '파워 사다리 [좌3]',
            LeftFour: '파워 사다리 [좌4]',
            RightThree: '파워 사다리 [우3]',
            RightFour: '파워 사다리 [우4]'
        },
        KLDOE: {
            Odd: '키노 사다리 [홀]',
            Even: '키노 사다리 [짝]'
        },
        KLDLR: {
            Left: '키노 사다리 [좌]',
            Right: '키노 사다리 [우]'
        },
        KLDTF: {
            Three: '키노 사다리 [3줄]',
            Four: '키노 사다리 [4줄]'
        },
        KLDCOMBO: {
            LeftThree: '키노 사다리 [좌3]',
            LeftFour: '키노 사다리 [좌4]',
            RightThree: '키노 사다리 [우3]',
            RightFour: '키노 사다리 [우4]'
        },
        BLDOE: {
            Odd: '보글 사다리 [홀]',
            Even: '보글 사다리 [짝]'
        },
        BLDLR: {
            Left: '보글 사다리 [좌]',
            Right: '보글 사다리 [우]'
        },
        BLDTF: {
            Three: '보글 사다리 [3줄]',
            Four: '보글 사다리 [4줄]'
        },
        BLDCOMBO: {
            LeftThree: '보글 사다리 [좌3]',
            LeftFour: '보글 사다리 [좌4]',
            RightThree: '보글 사다리 [우3]',
            RightFour: '보글 사다리 [우4]'
        }
    },
    convertMiniGameType: {
        powerball: '파워볼',
        powerladder: '파워 사다리',
        kenoladder: '키노 사다리',
        boglePowerball: '보글 파워볼',
        bogleladder: '보글 사다리',
        googlePowerball1: '구글 1분 파워볼',
        googlePowerball3: '구글 3분 파워볼',
        eosPowerball: '이오스 5분 파워볼'
    }
}

export default config