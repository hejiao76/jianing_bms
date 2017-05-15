'use strict'

define(['jquery', 'app/baseFinal'], function($, Final) {


	//private 
	var _id,
		_token,
		_openId,
		_nickname,
		_ok = false,
		_uuid;
	
	var get = function() {;

		$.cookie(Final.TOEFL_ID) && $.cookie(Final.TOKEN) && ~(function(id,token,openId,nickname,uuid) {
			_id = id;
			_token = token;
			_openId = openId;
			_nickname = nickname;
			_ok = true;
			_uuid = uuid
		})($.cookie(Final.TOEFL_ID),$.cookie(Final.TOKEN),$.cookie(Final.TOEFL_OPEN_ID),$.cookie(Final.TOEFL_NICKNAME),$.cookie(Final.TOEFL_UUID))

		//return ok()
	}
	var getToken = function() {
		 // return _token || "xiaoma"
		return $.cookie(Final.TOKEN) || ""
	}
	var getUserName = function() {
		return $.cookie(Final.USER_NAME) || ""
	}

	var clearAll = function(cbk) {
		$.cookie(Final.TOKEN,null,{expires:1,path:'/'})
		$.cookie(Final.USER_NAME,null,{expires:1,path:'/'})
	}

	//get()

	return {
		get: get,
		getToken : getToken,
		getUserName : getUserName,
		clearAll : clearAll
	}
})