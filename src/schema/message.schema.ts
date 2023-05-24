import Joi from 'joi';

interface IMessageData {
  text: string;
  sender: string;
  room: string;
  messageTimestamp: Date;
  classification: {
    topScore: object;
    details: Array<object>;
  };
}

const addMessageSchema = Joi.object({
  text: Joi.string().min(1).required(),
  sender: Joi.string().email({minDomainSegments: 2}).max(100).required(),
  room: Joi.string().min(1).required(),
  messageTimestamp: Joi.date().required(),
  classification: Joi.object({
    topScore: Joi.object({
      token: Joi.string().min(1).required(),
      riskId: Joi.number().integer().strict().required().min(1),
      classificationId: Joi.number().integer().strict().required().min(1),
    }).required(),
    details: Joi.array()
      .items(
        Joi.object({
          token: Joi.string().min(1).required(),
          riskId: Joi.number().integer().strict().required().min(1),
          classificationId: Joi.number().integer().strict().required().min(1),
        })
      )
      .min(1)
      .required(),
  }).required(),
}).required();

const getMessagesSchema = Joi.object({
  // required fields
  page: Joi.number().integer().strict().required().min(1),
  // optional fields
  filter: Joi.object({
    sender: Joi.string().email({minDomainSegments: 2}).max(100),
  }),
}).required();

export {IMessageData, addMessageSchema, getMessagesSchema};
