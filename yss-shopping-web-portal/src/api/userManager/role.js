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



