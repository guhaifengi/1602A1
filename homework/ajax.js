function Data(data) {
    var arr = [];
    for (var i in data) {
        arr.push(i + '=' + data[i]);
    }
    return arr.join('&');
}

function ajax(opt) {
    var json = opt || {};
    var url = json.url;
    if (!url) {
        return;
    }
    var type = opt.type || 'get';
    var data = opt.data || {};
    var async = json.async || true;
    var xml = null;
    if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest();
    } else {
        xml = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xml.onreadystatechange = function() {
        if (xml.readyState === 4) {
            if (xml.status === 200) {
                json.success && json.success(JSON.parse(xml.responseText));
            } else {
                json.error && json.error(new Error('error!'));
            }
        }
    };

    switch (type.toUpperCase()) {
        case 'GET':
            xml.open(type, url, async);
            xml.send(null);
            break;
        case 'POST':
            xml.open(type, url, async);
            xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xml.send(Data(data));
            break;
    }
}