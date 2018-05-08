function extend(obj1, obj2) {
    for (var k in obj2) {
        obj1[k] = obj2[k];
    }
    return obj1;
}

function ajax(obj) {
    var Default = {
        url: '',
        type: 'get',
        async: true,
        data: null,
        success: null,
        error: null
    };
    var settings = extend(Default, obj);
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var data = settings.type === 'get' && settings.data ? '?' + settings.data : '';
    xhr.open(settings.type, settings.url + data, settings.async);

    xhr.onreadystatechange = function() {

        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                settings.success && settings.success(xhr.responseText);
            } else {
                settings.error && settings.error('获取失败');
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var data1 = settings.type === 'post' && settings.data ? settings.data : null;

    xhr.send(null);
}