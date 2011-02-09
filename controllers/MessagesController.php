<?php

namespace app\controllers;

use \app\models\Message;

class MessagesController extends \lithium\action\Controller {

	public function index() {
		$messages = Message::all();
		return compact('messages');
	}

	public function view() {
		$message = Message::first($this->request->id);
		return compact('message');
	}

	public function add() {
		$message = Message::create();

		if (($this->request->data) && $message->save($this->request->data)) {
            return compact('message');
		}
        else
            return array('errors' => $message->errors());
	}

	public function edit() {
		$message = Message::find($this->request->id);

		if (($this->request->data) && $message->save($this->request->data)) {
            return compact('message');
		}
        else
            return array('errors' => $message->errors());
	}
}
