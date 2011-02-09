<?php

namespace app\models;

class Message extends \lithium\data\Model {
    protected $_schema = array(
        '_id' => array('type' => 'id'),
        'username' => array('type' => 'string', 'null' => false),
        'post' => array('type' => 'string', 'null' => false),
        'created'  => array('type' => 'date', 'null' => false),
        'tags'  => array('type' => 'array', 'null' => false),
    );

    /**
     * Override _init to ensure MongoDb indexes
     */
    public static function __init()
    {
        parent::__init();

        $collection = static::connection()->connection->{static::meta('source')};
        $collection->ensureIndex(array('created' => -1, 'username' => 1));
        $collection->ensureIndex(array('tags' => 1));
    }
}

Message::applyFilter('save', function($self, $params, $chain) {
    $record = $params['entity'];
    if (!$record->_id)
        $record->created = new \MongoDate();
    return $chain->next($self, $params, $chain);
});
