/**
 * 对获取表单提交信息格式化  格式成json形式
 * @param {${'form'}} form
 */
function serializeToJson(form) {
    let result = {}
    // [{name: 'email',value:'用户输入的内容'}]
    let f = form.serializeArray()
    f.forEach(item => {
        result[item.name] = item.value
    })
    return result
}
