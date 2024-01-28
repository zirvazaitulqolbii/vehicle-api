import { makeErrorResponse } from '../utils.js'

function mapError(issues) {
  return issues.map(
    issue => (
      {
        path: issue.path.join('.'),
        expected: issue.expected,
        message: issue.message
      }
    )
  )
}

function validate(schema, values, success) {
  return async (req, res, next) => {
    const { data, error } = schema.safeParse(values(req));
    if (error) res.status(400).json(makeErrorResponse(mapError(error.issues), 'validation'));
    else {
      success(req, data)
      next();
    }
  };
}

export function validateBody(schema) {
  return validate(schema, req => req.body, (req, data) => req.body = data);
}

export function validateQuery(schema) {
  return validate(schema, req => req.query, (req, data) => req.query = data);
}

export function validateParams(schema) {
  return validate(schema, req => req.params, (req, data) => req.params = data);
}