let helpers = {
  is_selected: (select, id) => {
    return select.toString() === id.toString() ? "selected" : "";
  },
  is_checked: (checks, id) => {
    return checks.map((e) => e?.toString()).indexOf(id?.toString()) > -1
      ? "checked"
      : "";
  },
  status_book: (status) => {
    switch (status) {
      case "Available":
        return "text-success";
      case "Maintenance":
        return "text-danger";
      default:
        return "text-warning";
    }
  },
  iff: (a, operator, b, opts) => {
    var bool = false;
    switch (operator) {
      case "==":
        bool = a == b;
        break;
      case "===":
        bool = a === b;
        break;
      case "!=":
        bool = a != b;
        break;
      case ">":
        bool = a > b;
        break;
      case ">=":
        bool = a >= b;
        break;
      case "<":
        bool = a < b;
        break;
      case "<=":
        bool = a <= b;
        break;
      default:
        const error = Error("Unknown operator " + operator);
        error.status = 500;
        throw error;
    }

    if (bool) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },

  active: (url, active) => {
    return url.split("/")[2] === active ? "active" : "";
  },
};

module.exports = helpers;
