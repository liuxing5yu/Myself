$(function() {
    $('#tb').DataTable({
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        stripeClasses: ["odd", "even"], // 为奇偶行加上样式，兼容不支持CSS伪类的场合
        dom: 'rt<"bottom"iflp<"clear">>',
        stateSave: true,
        searching : false, // 禁用原生搜索
        ordering: false
        
    });

    $('#saveRows').on('click', function() {
        var trs = [];
        $('#tb tbody tr').each(function() {
            trs.push(this.outerHTML);
        });

        doSave(trs, "application/json", "my.json");
    });

    // 添加行模态框显示时
    /*$('#addRowModal').on('show.bs.modal', function() {
        // 清空表单数据
        $('#addRowForm')[0].reset();
        // 清空按键数组
        keys = [];
        addKeyMode = false;
        multiMode = true;
    }).on('shown.bs.modal', function() {
        // 聚焦在第一个输入框内
        $('#keyBind').focus();

    });*/


    // 点击Save按钮
    $('#saveRow').on('click', function() {
        if (!($('#keyBind').val() && $('#keyEffect').val())) {
            return false;
        }
        // 添加行
        var $tr = $('<tr></tr>');
        var $keyTd = $('<td></td>').text($('#keyBind').val());
        var $effectTd = $('<td></td>').text($('#keyEffect').val());
        $tr.append($keyTd).append($effectTd);

        $('#tb').append($tr);
    });

    // 映射键值和对应显示的值: keyCode/*key*/: showValue
    var keyCode2value = {
        17 /*Control*/: 'Ctrl',
        27 /*Escape*/: 'Esc',
        32 /* */: 'Space',
        38 /*ArrowUp*/: 'Up',
        40 /*ArrowDown*/: 'Down',
        37 /*ArrowLeft*/: 'Left',
        39 /*ArrowRight*/: 'Right',
        107 /*+*/: 'Numpad_Add',
        109 /*-*/: 'Numpad_Subtract',
        106 /*-*/: 'Numpad_Multiply',
        111 /*-*/: 'Numpad_Divide',
    };

    var keys = [];

    // 在快捷键输入框按下键时，显示在输入框中
    $('#keyBind').keydown(function() {
        $(this).val('');

        if (multiMode) {
            keys = [];
        }

        return false;
    }).keyup(function(event) {
        var eventKey = event.key;
        var eventKeyCode = event.keyCode;

        console.log('key: ' + eventKey + '  keyCode: ' + eventKeyCode);

        // 处理显示的键值
        // 映射显示值
        if (keyCode2value[eventKeyCode]) {
            eventKey = keyCode2value[eventKeyCode];
        }

        // a-z
        var reg = /^[a-z]$/;
        if (reg.test(eventKey)) {
            eventKey = eventKey.toUpperCase();
        }

        // 是否为加级模式
        if (!addKeyMode) {
            keys.push(eventKey);
            // 调整键位显示顺序
            sortKeys(keys);
            $(this).val(keys.join('+'));
        } else {
            $(this).val(keys.join('+') + ', ' + eventKey);
        }
        return false;
    });

    $('#multiKeyModeBtn').addClass('active');

    var multiMode = true;

    // 绑定单/多键按钮事件
    $('#singleKeyModeBtn,#multiKeyModeBtn').on('click', function() {
        if (!$(this).hasClass('active')) {
            toggleMode();
        }
    });

    /**
     * 切换单/多键模式
     */
    function toggleMode() {
        multiMode = !multiMode;
        $('#singleKeyModeBtn').toggleClass('active');
        $('#multiKeyModeBtn').toggleClass('active');

        addKeyMode = false;

        // 清空Input
        clearKeyInput();

    }

    var addKeyMode = false;

    // 绑定加级按钮
    $('#addKeyBtn').on('click', function() {
        $('#keyBind').focus();

        if (!keys.length) {
            return false;
        }

        addKeyMode = true;

        // 手动切换为单键模式
        if (multiMode) {
            multiMode = false;
            $('#singleKeyModeBtn').toggleClass('active');
            $('#multiKeyModeBtn').toggleClass('active');
        }
    });

    // 绑定清除按钮
    $('#clearInputBtn').on('click', function() {
        clearKeyInput();
    });

    /**
     * 清除绑定键输入框中的内容
     */
    function clearKeyInput() {
        $('#keyBind').val('');
        keys = [];

        $('#keyBind').focus();
    }

    /**
     * 为keys数组排序，确保Ctrl、Alt、Shift在其他键位之前
     */
    function sortKeys(keys) {
        if (!keys.length) {
            return false;
        }
        var curIndex = 0;

        var commands = ['Ctrl', 'Alt', 'Shift'];
        for (var cmdIdx in commands) {
            console.log('curIndex...' + curIndex);
            var index = keys.indexOf(commands[cmdIdx]);
            if (index != -1) {
                keys[index] = keys[curIndex];
                keys[curIndex] = commands[cmdIdx];
                curIndex++;
            }
        }
    }

    /**
     * 保存文件
     */
    function doSave(value, type, name) {
        var blob;
        if (typeof window.Blob == "function") {
            blob = new Blob([value], { type: type });
        } else {
            var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
            var bb = new BlobBuilder();
            bb.append(value);
            blob = bb.getBlob(type);
        }
        var URL = window.URL || window.webkitURL;
        var bloburl = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        if ('download' in anchor) {
            anchor.style.visibility = "hidden";
            anchor.href = bloburl;
            anchor.download = name;
            document.body.appendChild(anchor);
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, true);
            anchor.dispatchEvent(evt);
            document.body.removeChild(anchor);
        } else if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, name);
        } else {
            location.href = bloburl;
        }
    }

});