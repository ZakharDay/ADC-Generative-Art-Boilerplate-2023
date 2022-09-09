require "application_system_test_case"

class PrototypesTest < ApplicationSystemTestCase
  setup do
    @prototype = prototypes(:one)
  end

  test "visiting the index" do
    visit prototypes_url
    assert_selector "h1", text: "Prototypes"
  end

  test "should create prototype" do
    visit prototypes_url
    click_on "New prototype"

    fill_in "About", with: @prototype.about
    fill_in "Name", with: @prototype.name
    click_on "Create Prototype"

    assert_text "Prototype was successfully created"
    click_on "Back"
  end

  test "should update Prototype" do
    visit prototype_url(@prototype)
    click_on "Edit this prototype", match: :first

    fill_in "About", with: @prototype.about
    fill_in "Name", with: @prototype.name
    click_on "Update Prototype"

    assert_text "Prototype was successfully updated"
    click_on "Back"
  end

  test "should destroy Prototype" do
    visit prototype_url(@prototype)
    click_on "Destroy this prototype", match: :first

    assert_text "Prototype was successfully destroyed"
  end
end
