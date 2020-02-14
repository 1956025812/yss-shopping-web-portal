import axios from '@/libs/api.request'


/**
 * @description 查询菜单列表
 */
export const selectSysMenuListAPI = (params) => {
    return axios.request({
        url: '/sysMenu/list',
        method: 'get',
        params: params
    });
}



/**
 * @description 查询菜单详情
 */
export const selectSysMenuDetailAPI = (params) => {
    return axios.request({
        url: '/sysMenu/detail',
        method: 'get',
        params: params
    });
}



/**
 * @description 新增菜单
 */
export const saveSysMenuAPI = (params) => {
    return axios.request({
        url: '/sysMenu/save',
        method: 'post',
        data: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    });
}







