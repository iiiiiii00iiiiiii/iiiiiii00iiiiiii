import express from 'express'

import Auth from '../lib/auth'
const auth: Auth = new Auth()

import UserController from '../controllers/userController'
const userCtr: UserController = new UserController()

import MoneyController from '../controllers/moneyController'
const moneyCtr: MoneyController = new MoneyController()

import BoardController from '../controllers/boardController'
const boardCtr: BoardController = new BoardController()

import MessageController from '../controllers/messageController'
const messageCtr: MessageController = new MessageController()

import GameController from '../controllers/gameController'
const gameCtr: GameController = new GameController()

import BetController from '../controllers/betController'
const betCtr: BetController = new BetController()

import EtcController from '../controllers/etcController'
const etcCtr: EtcController = new EtcController()

import KplayController from '../controllers/kplayController'
const kplayCtr: KplayController = new KplayController()

// import AdminController from '../controllers/adminController'
// const adminCtr: AdminController = new AdminController()

// import NoticeController from '../controllers/boardNoticeController'
// const noticeCtr: NoticeController = new NoticeController()

// import EventController from '../controllers/boardEventController'
// const eventCtr: EventController = new EventController()

// import FaqController from '../controllers/boardFaqController'
// const faqCtr: FaqController = new FaqController()

// import ApiController from '../controllers/apiController'
// const apiCtr: ApiController = new ApiController()

// import DenyController from '../controllers/denyController'
// const denyCtr: DenyController = new DenyController()

// import ConfigController from '../controllers/configController'
// const configCtr: ConfigController = new ConfigController()

// import ConfigMiniGamesController from '../controllers/configMiniGamesController'
// const configMinigamesCtr: ConfigMiniGamesController = new ConfigMiniGamesController

// import MoneyController from '../controllers/moneyController'
// const moneyCtr: MoneyController = new MoneyController

// import MessageController from '../controllers/messageController'
// const messageCtr: MessageController = new MessageController

// import MinigamesController from '../controllers/minigamesController'
// const minigamesCtr: MinigamesController = new MinigamesController

// import PartnerController from '../controllers/parnterController'
// const partnerCtr = new PartnerController()

// import BankController from '../controllers/bankController'
// const bankCtr: BankController = new BankController()

const router = express.Router()

// router.get('/get-dashboard', boardCtr.getDashboard)
router.get('/get-home', etcCtr.getHome)



// User
router.get('/login', userCtr.login)
router.post('/join', userCtr.join)
router.put('/edit-user', auth.checkLogin(), userCtr.editUser)
router.get('/get-user-info', auth.checkLogin(), userCtr.getUserInfo)


// Charge
router.get('/get-charge-list', auth.checkLogin(), moneyCtr.getChargeList)
router.post('/set-charge', auth.checkLogin(), moneyCtr.setCharge)
router.delete('/delete-charge', auth.checkLogin(), moneyCtr.deleteCharge)
router.delete('/delete-charge-all', auth.checkLogin(), moneyCtr.deleteChargeAll)


// Exchange
router.get('/get-exchange-list', auth.checkLogin(), moneyCtr.getExchangeList)
router.post('/set-exchange', auth.checkLogin(), moneyCtr.setExchange)
router.delete('/delete-exchange', auth.checkLogin(), moneyCtr.deleteExchange)
router.delete('/delete-exchange-all', auth.checkLogin(), moneyCtr.deleteExchangeAll)


// Point
router.get('/get-point-list', auth.checkLogin(), moneyCtr.getPointList)
router.post('/exchange-point', auth.checkLogin(), moneyCtr.exchangePoint)
router.delete('/delete-point', auth.checkLogin(), moneyCtr.deletePoint)
router.delete('/delete-point-all', auth.checkLogin(), moneyCtr.deletePointAll)


// Board
router.get('/get-notice-list', auth.checkLogin(), boardCtr.getNoticeList)
router.get('/get-notice-detail', auth.checkLogin(), boardCtr.getNoticeDetail)
router.get('/get-faq-list', auth.checkLogin(), boardCtr.getFaqList)
router.get('/get-faq-detail', auth.checkLogin(), boardCtr.getFaqDetail)
router.get('/get-event-list', auth.checkLogin(), boardCtr.getEventList)
router.get('/get-event-detail', auth.checkLogin(), boardCtr.getEventDetail)
router.get('/get-rules-list', auth.checkLogin(), boardCtr.getRulesList)
router.get('/get-rules-detail', auth.checkLogin(), boardCtr.getRulesDetail)


// Help
router.get('/get-help-list', auth.checkLogin(), boardCtr.getHelpList)
router.get('/get-help-detail', auth.checkLogin(), boardCtr.getHelpDetail)
router.post('/help', auth.checkLogin(), boardCtr.help)
router.post('/charge-information', auth.checkLogin(), boardCtr.chargeInformation)
router.delete('/delete-help', auth.checkLogin(), boardCtr.deleteHelp)
router.delete('/delete-help-all', auth.checkLogin(), boardCtr.deleteHelpAll)


// Message
router.get('/get-message-list', auth.checkLogin(), messageCtr.getMessageList)
router.get('/get-message-detail', auth.checkLogin(), messageCtr.getMessageDetail)
router.put('/check-message-all', auth.checkLogin(), messageCtr.checkMessageAll)
router.delete('/delete-message', auth.checkLogin(), messageCtr.deleteMessage)
router.delete('/delete-message-all', auth.checkLogin(), messageCtr.deleteMessageAll)


// Attendance
router.get('/get-attendance', auth.checkLogin(), userCtr.getAttendance)
router.post('/set-attendance', auth.checkLogin(), userCtr.setAttendance)


// Popup
router.get('/get-popups', etcCtr.getPopups)


// ETC
router.get('/check-duplicate-and-event', auth.checkLogin(), etcCtr.checkDuplicateAndEvent)


// category
router.get('/get-category', gameCtr.getCategory)


// sports
router.get('/get-prematch-list', gameCtr.getPrematchList)
router.get('/get-prematch-cross-list', gameCtr.getPrematchCrossList)
router.get('/get-live-list', gameCtr.getLiveList)
router.get('/get-live-detail', gameCtr.getLiveDetail)
router.get('/get-prematch-special-list', gameCtr.getPrematchSpecialList)
router.get('/get-live-kor-list', gameCtr.getLiveKorList)

router.get('/get-game-results', gameCtr.getGameResults)


// casino
router.get('/kpay-url', auth.checkLogin(), kplayCtr.kplayURL)
router.get('/slots/:productID/:gameID', auth.checkLoginCookie(), kplayCtr.kplayOpenGames)


// bet
router.post('/bet', auth.checkLogin(), betCtr.bet)


// bet list
router.get('/get-sports-bet-list', auth.checkLogin(), betCtr.getSportsBetList)
router.get('/get-minigmaes-bet-list', auth.checkLogin(), betCtr.getMinigamesBetList)
router.get('/get-casino-bet-list', auth.checkLogin(), betCtr.getCasinoBetList)
router.put('/cancel-sports-bet', auth.checkLogin(), betCtr.cancelSportsBet)
router.delete('/delete-sports-bet', auth.checkLogin(), betCtr.deleteSportsBet)
router.delete('/delete-minigames-bet', auth.checkLogin(), betCtr.deleteMinigamesBet)
router.delete('/delete-casino-bet', auth.checkLogin(), betCtr.deleteCasinoBet)
router.delete('/delete-sports-bet-all', auth.checkLogin(), betCtr.deleteSportsBetAll)
router.delete('/delete-minigames-bet-all', auth.checkLogin(), betCtr.deleteMinigamesBetAll)
router.delete('/delete-casino-bet-all', auth.checkLogin(), betCtr.deleteCasinoBetAll)
router.get('/get-minigame-bet-list-recent', auth.checkLogin(), betCtr.getMinigameBetListRecent)



// maintenance
router.get('/get-maintenance', etcCtr.getMaintenance)


// minigames
router.get('/get-powerball', gameCtr.getPowerball)
router.get('/get-powerladder', gameCtr.getPowerladder)
router.get('/get-kenoladder', gameCtr.getKenoladder)
router.get('/get-boglepowerball', gameCtr.getBoglePowerball)
router.get('/get-bogleladder', gameCtr.getBogleladder)
router.get('/get-googlepowerball1', gameCtr.getGooglePowerball1)
router.get('/get-googlepowerball3', gameCtr.getGooglePowerball3)
router.get('/get-eospowerball1', gameCtr.getEosPowerball1)
router.get('/get-eospowerball3', gameCtr.getEosPowerball3)
router.get('/get-eospowerball', gameCtr.getEosPowerball)
router.get('/get-coinpowerball', gameCtr.getCoinPowerball3)
router.get('/get-coinpowerball', gameCtr.getCoinPowerball)
router.get('/get-speedladder', gameCtr.getSpeedladder)



















export default router