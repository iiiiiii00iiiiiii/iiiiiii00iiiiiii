"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../lib/auth"));
const auth = new auth_1.default();
const userController_1 = __importDefault(require("../controllers/userController"));
const userCtr = new userController_1.default();
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
const router = express_1.default.Router();
// User
router.get('/login', userCtr.login);
router.post('/join', userCtr.join);
router.get('/get-user-info', auth.checkLogin(), userCtr.getUserInfo);
// router.get('/user', auth.checkLogin(), userCtr.getUserList)
// router.post('/set-user', auth.checkLogin(), userCtr.setUser)
// router.put('/edit-user', auth.checkLogin(), userCtr.editUser)
// router.get('/get-user-data-for-modal', auth.checkLogin(), userCtr.getUserDataForModal)
// router.get('/get-user-detail', auth.checkLogin(), userCtr.getUserDetail)
// router.put('/generate-apikey', auth.checkLogin(), userCtr.generateApikey)
// router.get('/get-user-memo', auth.checkLogin(), userCtr.getUserMemo)
// router.put('/edit-user-memo', auth.checkLogin(), userCtr.editUserMemo)
// router.post('/set-user-message', auth.checkLogin(), messageCtr.setUserMessage)
// router.get('/get-user-message', auth.checkLogin(), messageCtr.getUserMessage)
// router.delete('/delete-user-message', auth.checkLogin(), messageCtr.deleteUserMessage)
// router.delete('/delete-all-user-message', auth.checkLogin(), messageCtr.deleteAllUserMessage)
// router.get('/get-user-message-template', auth.checkLogin(), messageCtr.getUserMessageTemplate)
// router.get('/get-user-rewards', auth.checkLogin(), userCtr.getUserRewards)
// router.put('/edit-user-rewards', auth.checkLogin(), userCtr.editUserRewards)
// router.get('/get-user-top-config', auth.checkLogin(), userCtr.getUserTopConfig)
// router.put('/edit-user-top-config', auth.checkLogin(), userCtr.editUserTopConfig)
//
// // Admin
// router.get('/admin', auth.checkLogin(), adminCtr.getAdminList)
// router.post('/set-admin', auth.checkLogin(), adminCtr.setAdmin)
// router.get('/get-detail-admin', auth.checkLogin(), adminCtr.getDetailAdmin)
// router.put('/edit-admin', auth.checkLogin(), adminCtr.editAdmin)
// router.delete('/delete-admin', auth.checkLogin(), adminCtr.deleteAdmin)
// // Admin Ipaddress
// router.get('/admin-ipaddress', auth.checkLogin(), adminCtr.getAdminIpaddressList)
// router.post('/set-admin-ipaddress', auth.checkLogin(), adminCtr.setAdminIpaddress)
// router.get('/get-detail-admin-ipaddress', auth.checkLogin(), adminCtr.getDetailAdminIpaddress)
// router.put('/edit-admin-ipaddress', auth.checkLogin(), adminCtr.editAdminIpaddress)
// router.delete('/delete-admin-ipaddress', auth.checkLogin(), adminCtr.deleteAdminIpaddress)
// // Admin Login Log
// router.get('/admin-login-log', auth.checkLogin(), adminCtr.getAdminLoginLog)
// // Notice
// router.get('/notice', auth.checkLogin(), noticeCtr.getNoticeList)
// router.post('/set-notice', auth.checkLogin(), noticeCtr.setNotice)
// router.get('/get-detail-notice', auth.checkLogin(), noticeCtr.getDetailNotice)
// router.put('/edit-notice', auth.checkLogin(), noticeCtr.editNotice)
// router.delete('/delete-notice', auth.checkLogin(), noticeCtr.deleteNotice)
// // Event
// router.get('/event', auth.checkLogin(), eventCtr.getEventList)
// router.post('/set-event', auth.checkLogin(), eventCtr.setEvent)
// router.get('/get-detail-event', auth.checkLogin(), eventCtr.getDetailEvent)
// router.put('/edit-event', auth.checkLogin(), eventCtr.editEvent)
// router.delete('/delete-event', auth.checkLogin(), eventCtr.deleteEvent)
// // Faq
// router.get('/faq', auth.checkLogin(), faqCtr.getFaqList)
// router.post('/set-faq', auth.checkLogin(), faqCtr.setFaq)
// router.get('/get-detail-faq', auth.checkLogin(), faqCtr.getDetailFaq)
// router.put('/edit-faq', auth.checkLogin(), faqCtr.editFaq)
// router.delete('/delete-faq', auth.checkLogin(), faqCtr.deleteFaq)
// // Api Ipaddress
// router.get('/api-ipaddress', auth.checkLogin(), apiCtr.getApiIpaddressList)
// router.post('/set-api-ipaddress', auth.checkLogin(), apiCtr.setApiIpaddress)
// router.get('/get-detail-api-ipaddress', auth.checkLogin(), apiCtr.getDetailApiIpaddress)
// router.put('/edit-api-ipaddress', auth.checkLogin(), apiCtr.editApiIpaddress)
// router.delete('/delete-api-ipaddress', auth.checkLogin(), apiCtr.deleteApiIpaddress)
// // Deny Ipaddress
// router.get('/deny-ipaddress', auth.checkLogin(), denyCtr.getDenyIpaddressList)
// router.post('/set-deny-ipaddress', auth.checkLogin(), denyCtr.setDenyIpaddress)
// router.get('/get-detail-deny-ipaddress', auth.checkLogin(), denyCtr.getDetailDenyIpaddress)
// router.put('/edit-deny-ipaddress', auth.checkLogin(), denyCtr.editDenyIpaddress)
// router.delete('/delete-deny-ipaddress', auth.checkLogin(), denyCtr.deleteDenyIpaddress)
// // Maintenance
// router.get('/maintenance', auth.checkLogin(), configCtr.maintenance)
// router.put('/edit-maintenance', auth.checkLogin(), configCtr.editMaintenance)
// router.get('/bank', auth.checkLogin(), configCtr.bank)
// router.put('/edit-bank', auth.checkLogin(), configCtr.editBank)
// router.put('/edit-bank-template', auth.checkLogin(), configCtr.editBankTemplate)
// router.get('/bonus', auth.checkLogin(), configCtr.bonus)
// router.put('/edit-bonus', auth.checkLogin(), configCtr.editBonus)
// // Setting Minigames
// router.get('/get-powerball-settings', auth.checkLogin(), configMinigamesCtr.getPowerballSettings)
// router.put('/edit-powerball-switch', auth.checkLogin(), configMinigamesCtr.editPowerballSwitch)
// router.put('/edit-powerball-end-time', auth.checkLogin(), configMinigamesCtr.editPowerballEndTime)
// router.put('/edit-powerball-bet', auth.checkLogin(), configMinigamesCtr.editPowerballBet)
// router.put('/edit-powerball-rate', auth.checkLogin(), configMinigamesCtr.editPowerballRate)
// router.put('/edit-powerball-top', auth.checkLogin(), configMinigamesCtr.editPowerballTop)
// router.put('/edit-powerball-top-reward', auth.checkLogin(), configMinigamesCtr.editPowerballTopReward)
// router.get('/get-ladder-settings', auth.checkLogin(), configMinigamesCtr.getLadderSettings)
// router.put('/edit-ladder-switch', auth.checkLogin(), configMinigamesCtr.editLadderSwitch)
// router.put('/edit-ladder-end-time', auth.checkLogin(), configMinigamesCtr.editLadderEndTime)
// router.put('/edit-ladder-bet', auth.checkLogin(), configMinigamesCtr.editLadderBet)
// router.put('/edit-ladder-rate', auth.checkLogin(), configMinigamesCtr.editLadderRate)
// router.put('/edit-ladder-top', auth.checkLogin(), configMinigamesCtr.editLadderTop)
// router.put('/edit-ladder-top-reward', auth.checkLogin(), configMinigamesCtr.editLadderTopReward)
// // money
// router.put('/charge-money-direct', auth.checkLogin(), moneyCtr.chargeMoneyDirect)
// router.put('/exchange-money-direct', auth.checkLogin(), moneyCtr.exchangeMoneyDirect)
// router.put('/charge-point-direct', auth.checkLogin(), moneyCtr.chargePointDirect)
// router.put('/exchange-point-direct', auth.checkLogin(), moneyCtr.exchangePointDirect)
// // message
// router.post('/set-message-template', auth.checkLogin(), messageCtr.setMessageTemplate)
// router.get('/message-template', auth.checkLogin(), messageCtr.getMessageTemplate)
// router.get('/get-detail-message-template', auth.checkLogin(), messageCtr.getDetailMessageTemplate)
// router.put('/edit-message-template', auth.checkLogin(), messageCtr.editMessageTemplate)
// router.delete('/delete-message-template', auth.checkLogin(), messageCtr.deleteMessageTemplate)
// router.get('/message', auth.checkLogin(), messageCtr.getMessageList)
// router.post('/set-message', auth.checkLogin(), messageCtr.setMessage)
// // minigames
// router.get('/powerball', auth.checkLogin(), minigamesCtr.getPowerballList)
// router.get('/powerladder', auth.checkLogin(), minigamesCtr.getPowerladderList)
// router.get('/kenoladder', auth.checkLogin(), minigamesCtr.getKenoladderList)
// router.get('/bogle-powerball', auth.checkLogin(), minigamesCtr.getBoglePowerballList)
// router.get('/bogleladder', auth.checkLogin(), minigamesCtr.getBogleladderList)
// router.get('/google-powerball1', auth.checkLogin(), minigamesCtr.getGooglePowerball1List)
// router.get('/google-powerball3', auth.checkLogin(), minigamesCtr.getGooglePowerball3List)
// router.post('/set-minigame-result', auth.checkLogin(), minigamesCtr.setMinigameResult)
exports.default = router;
