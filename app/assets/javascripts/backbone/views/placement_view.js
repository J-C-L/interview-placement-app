const PlacementView = Backbone.View.extend({
  initialize: function(options) {
    this.studentBus = new StudentBus();
    this.busDetails = new StudentBusView({
      model: this.studentBus,
      el: this.$('#bus-details')
    });

    this.unplacedStudents = new Company({
      students: options.unplacedStudents,
      slots: 24,
      name: "Unplaced Students"
    });
    this.unplacedStudentsView = new CompanyView({
      model: this.unplacedStudents,
      el: this.$('#unplaced-students'),
      bus: this.studentBus
    });

    this.companyViews = [];
    this.companyListElement = this.$('#companies');

    this.model.each(function(company) {
      this.addCompanyView(company);
      this.listenTo(company, 'change', this.updateScore);
    }, this);

    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.model, 'add', this.addCompanyView);
  },

  updateScore: function() {
    console.log("in PlacementView.updateScore");
    let score = 0;
    this.model.forEach(function(company) {
      let company_score = company.getScore();
      score += company_score;
    }, this);
    this.studentBus.set('score', score);
  },

  addCompanyView: function(company) {
    const companyView = new CompanyView({
      model: company,
      bus: this.studentBus
    });
    this.companyViews.push(companyView);
  },

  render: function() {
    console.log("in PlacementView.render()")

    this.companyListElement.empty();

    this.companyViews.forEach(function(companyView) {
      companyView.$el.addClass('large-4 columns');
      this.companyListElement.append(companyView.el);
    }, this);

    return this;
  }
});