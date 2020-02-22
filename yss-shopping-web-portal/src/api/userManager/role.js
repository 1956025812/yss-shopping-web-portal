import axios from '@/libs/api.request'


/**
 * @description 查询角色列表
 */
export const selectSysRoleListAPI = (params) => {
    return axios.request({
        url: '/sysRole/list',
        method: 'get',
        params: params
    });
}



/**
 * @description 查询角色详情
 */
export const selectSysRoleDetailAPI = (params) => {
    return axios.request({
        url: '/sysRole/detail',
        method: 'get',
        params: params
    });
}



/**
 * @description 新增菜单
 */
export const saveSysRoleAPI = (params) => {
    return axios.request({
        url: '/sysRole/save',
        method: 'post',
        data: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    });
}



/**
 * @description 修改菜单
 */
export const updateSysRoleAPI = (params) => {
    return axios.request({
        url: '/sysRole/update',
        method: 'post',
        data: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    });
}

