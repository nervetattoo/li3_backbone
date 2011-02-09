<?php

namespace app\controllers;

use \app\models\Message;

class AppController extends \lithium\action\Controller {

	public function bootstrap() {
        $messages = Message::find('all', array(
            'order' => array(
                'created' => -1
            ),
            'limit' => 20
        ));
        $messages = $messages->map(function($model) {
            $arr = $model->to('array');
            $arr['id'] = $arr['_id'];
            unset($arr['_id']);
            return $arr;
        }, array('collect' => false));
        $messages = json_encode($messages);
        return compact('messages');
	}
}
