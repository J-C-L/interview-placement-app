require 'test_helper'

class CompanyTest < ActiveSupport::TestCase
  test "Companies have students" do
    assert Company.count > 0
    Company.all.each do |company|
      company.students.each do |student|
        assert_kind_of Student, student
      end
    end
  end
end
