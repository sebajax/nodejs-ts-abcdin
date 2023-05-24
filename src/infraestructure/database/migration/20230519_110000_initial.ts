// module import
import {DataTypes} from 'sequelize';
// migration type import
import {Migration} from '../migrator';

export const up: Migration = async ({
  context: queryInterface,
}): Promise<void> => {
  await queryInterface.createTable('message', {
    messageId: {
      field: 'message_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    messageTimestamp: {
      field: 'message_timestamp',
      type: DataTypes.DATE,
      allowNull: false,
    },
    topScore: {
      field: 'top_score',
      type: DataTypes.JSONB,
      allowNull: false,
    },
    room: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  });

  /*
  --- add constraints to tables ---
  */

  /*
    --- add indexes to tables ---
  */
  await queryInterface.addIndex('message', ['sender'], {
    name: 'idx_message_sender',
  });
  await queryInterface.addIndex('message', ['room'], {
    name: 'idx_message_room',
  });
};

export const down: Migration = async ({
  context: queryInterface,
}): Promise<void> => {
  /*
  --- remove constraints to tables ---
  */

  /*
  --- remove indexes to tables ---
  */
  await queryInterface.removeIndex('message', 'idx_message_sender');
  await queryInterface.removeIndex('message', 'idx_message_room');

  /*
  --- remove tables ---
  */
  await queryInterface.dropTable('message');
};