$(function() {
    // 添加行模态框显示时
    $('#addRowModal').on('show.bs.modal', function() {
        // 清空表单数据
        $('#addRowForm')[0].reset();
        // 清空按键数组
        keys = [];

    }).on('shown.bs.modal', function() {
        // 聚焦在第一个输入框内
        $('#keyBind').focus();

    });



    // 点击添加行按钮
    $('#addRow').on('click', function() {
        $('#addRowModal').modal('show');
    });

    // 点击Save按钮
    $('#saveRow').on('click', function() {
        // 添加行
        var $tr = $('<tr></tr>');
        var $keyTd = $('<td></td>').text($('#keyBind').val());
        var $effectTd = $('<td></td>').text($('#keyEffect').val());
        $tr.append($keyTd).append($effectTd);

        $('#tb').append($tr);

        $('#addRowModal').modal('hide');
    });

    // 映射键值和对应显示的值: keyCode/*key*/: showValue
    var keyCode2value = {
        17/*Control*/		: 'Ctrl',
        32/* */				: 'Space',
        38/*ArrowUp*/		: 'Up',
        40/*ArrowDown*/		: 'Down',
        37/*ArrowLeft*/		: 'Left',
        39/*ArrowRight*/	: 'Right',
        107/*+*/			: 'Numpad_Add',
        109/*-*/			: 'Numpad_Subtract',
        106/*-*/			: 'Numpad_Multiply',
        111/*-*/			: 'Numpad_Divide',
    };

    /*// 屏蔽的键
    var shieldKeys = [
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        'Enter', 'Tab'
    ];*/

    var keys = [];

    // 在快捷键输入框按下键时，显示在输入框中
    $('#keyBind').keydown(function(){
    	keys = [];
    	$(this).val('');
    	return false;
    }).keyup(function(event) {
        var eventKey = event.key;
        var eventKeyCode = event.keyCode;

        // 处理显示的键值
        // 映射显示值
        if(keyCode2value[eventKeyCode]){
        	eventKey = keyCode2value[eventKeyCode];
        }

        // a-z
        var reg = /^[a-z]$/;
        if(reg.test(eventKey)){
        	eventKey = eventKey.toUpperCase();
        }

        keys.push(eventKey);
        // 调整顺序，保证Ctrl、Alt、Shift在前三位
        sortKeys(keys);

        console.log('----------------');
        console.log(event.key);
        console.log(event.keyCode);
        /*var val = $(this).val();
        if (val) {
            val += '+' + eventKey;
        } else {
            val = eventKey;
        }*/
        $(this).val(keys.join('+'));

        // if (shieldKeys.indexOf(eventKey) != -1) {
        	// 屏蔽所有键的默认行为
            return false;
        // }
    });
});

function sortKeys(keys){
	if(!keys){
		return false;
	}
	var curIndex = 0;
	var ctrlIndex = keys.indexOf('Ctrl');
	var altIndex = keys.indexOf('Alt');
	var shiftIndex = keys.indexOf('Shift');
	
	if(ctrlIndex!=-1){
		keys[ctrlIndex] = keys[curIndex];
		keys[curIndex] = 'Ctrl';
		curIndex++;
	}
	if(altIndex!=-1){
		keys[altIndex] = keys[curIndex];
		keys[curIndex] = 'Alt';
		curIndex++;
	}
	if(shiftIndex!=-1){
		keys[shiftIndex] = keys[curIndex];
		keys[curIndex] = 'Shift';
		curIndex++;
	}
}