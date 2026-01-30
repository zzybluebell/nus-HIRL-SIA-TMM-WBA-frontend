import { get, post } from '../utils/request'

export const loginApi = (data) => post('/auth/web/login', data) // 登录接口
export const registerApi = (data) => post('/auth/web/registration', data) // 注册接口
export const confirmEmailApi = (params) => get('/on_boarding/confirm_email', params) // 验证邮箱
export const timeSlotsApi = (params) => get('/auth/web/time_slots', params) //  Register页面 接口
export const changeTimeSlotsApi = (params) => post('/auth/web/change_time_slots', params) //  Register页面 接口
export const changePasswordApi = (params) => post('/auth/web/change_password', params) // changePassword页面 接口
export const forgetPasswordApi = (params) => post('/auth/web/forget_password', params) // 忘记密码接口
export const sleepTableApi = (params) => get('/auth/web/performance_table/sleep', params) // sleep_tabl页面 接口
export const exerciseTableApi = (params) => get('/auth/web/performance_table/activity', params) // exercise_tabl页面 接口
export const healthMetricsTableApi = (params) => get('/health-data/spo2-br-hrv-rhr/', params) //  fatigueT_tabl页面 接口
export const fatigueTableApi = (params) => get('/auth/web/performance_table/questionnaire', params) //  fatigueT_tabl页面 接口
export const workloadTableApi = (params) => get('/auth/web/performance_table/workload', params) //  workload_tabl页面 接口
export const wellbeingTableApi = (params) => get('/auth/web/performance_table/wellbeing', params) //  wellbeing_tabl页面 接口
export const pvtTableApi = (params) => get('/auth/web/performance_table/pvt', params) //  pvt_tabl页面 接口
export const staffIdTableApi = (params) => get('/auth/web/staff_id', params) //  Notify Users_tabl页面 接口
export const scheduleApi = (params) => get('/html/schedule.json', params) //  schedule页面 接口
export const whitelistApi = (params) => get('/auth/web/whitelists', params) //  whitelist页面 接口
export const postWhitelistApi = (params) => post('/auth/web/update_whitelist', params) //  whitelist页面 接口
export const phase2WhitelistApi = (params) => get('/auth/web/get_whitelist_phase_two', params) //whitelist intervention phase
export const phase2WhitelistApiInvited = (params) => get('/auth/web/get_whitelist_invited_phase_2', params) 
export const phase2WhitelistCancel = (params) => post('/auth/web/user_invited_cancel', params) //whitelist intervention phase


// onboarding APIs
export const getDeviceAPI = () => get('/on_boarding/get_device')
export const getFitbitIDAPI = () => get('/on_boarding/fitbit_id')
export const getQuestionAPI = () => get('/on_boarding/question')
export const getStepAPI = () => get('/on_boarding/steps')
export const getTimeSlotsAPI = () => get('/on_boarding/time_slots')
export const getUserLastTimeSlotsAPI = () => get('/on_boarding/user_last_time_slots')
export const postConfirmCollectionAPI = (params) => post('/on_boarding/confirm_collection', params)
export const postOptionAPI = (params) => post('/on_boarding/option', params)
export const postPvtStateAPI = (params) => post('/on_boarding/check_pvt_and_questionnaire', params)
export const postStepAPI = (params) => post('/on_boarding/steps', params)
export const postTimeSlotsAPI = (params) => post('/on_boarding/time_slots', params)

// onboarding admin APIs
export const adminTimeSlotsApi = (params) => get('/auth/admin_time_slots', params)
export const deleteAdminTimeSlotApi = (params) => post('/auth/deletion_admin_time_slot', params)
export const createAdminTimeSlotApi = (params) => post('/auth/creation_admin_time_slots', params)
export const getAdminTimeSlotApi = (params) => get('/auth/get_admin_time_slot', params)
export const editAdminTimeSlotApi = (params) => post('/auth/edit_admin_time_slot', params)
export const editUserApi = (params) => post('/auth/admin_edit_user', params)
export const userTableApi = (params) => get('/auth/admin_user_table', params)
export const collectionTableApi = (params) => get('/auth/admin_user_collection_table', params)

// fitbit APIs
export const postFitbitSSO = (params) => post('/datasync/fitbit-sso-web', params)

//dashboard APIs
export const percentatageOfDaysWearing = (params) => get('/auth/web/dashboard/percentage_of_days_wearing', params)
export const userRecruitment = (params) => get('/auth/web/dashboard/user_recruitment', params)
export const weekSummary = (params) => get('/auth/web/dashboard/week_summary', params)
export const pvtWeekSummary = (params) => get('/auth/web/dashboard/pvt_week_summary', params)

// export const fatigueTableApi = (params) => get('/auth/web/performance_table/questionnaire', params)  //  fatigueT_tabl页面 接口
// export const fatigueTableApi = (params) => get('/auth/web/performance_table/questionnaire', params)  //  fatigueT_tabl页面 接口
