# Choices

## Checkboxes

boolean, enum values

## Radios

boolean, enum values

#### Legacy Syntax:

Radio buttons are HTML `<input>` elements of the form

```html
<input form-field type="radio" name="[variableName]" value="[value]">
```

*Note:* the legacy radio button only supports string variables.

| _Parameter_      | _Explanation_                    |
|--------------..--|----------------------------------|
| __variableName__ | The name of the process variable |
| __value__        | The value of the radio button    |


Radio Buttons are usually used as a group:

```html
<input form-field type="radio" name="approver" value="jonny"> Jonny <br>
<input form-field type="radio" name="approver" value="mary"> Mary
```

## Select Boxes

boolean, enum values, ...

#### Legacy Syntax:

```html
<select form-field type="[type]" name="[variableName]" form-values="[optionsVarName]">
  <option value="[value]">[label]</option>
  <option value="[value]">[label]</option>
</select>
```

The following parameters are supported:

| Parameter | Explanation                                |
|-----------|--------------------------------------------|
| __type__  | The datatype of the select box.<br/>`string`, `number`, `boolean` types are supported. |
| __variableName__ | The name of the process variable to which this input field should be bound. |
| __optionsVarName__ | Process variable providing the select options. The process variable can be of type java.util.Map or java.util.List. In case of a Map, the keys in the map are used as values of the select option and the values in the map are used as labels. |
| __value__ | This value is used as value when submitting the select box. |
| __label__ | This label is displayed to the user. |

A simple example of a select box binding to the process variable `approver`:

```html
<select form-field type="string" name="approver">
  <option value="demo">Demo</option>
  <option value="john">Jonny</option>
  <option value="peter">Peter Meter</option>
</select>
```

Select options can also be loaded from a process variable:

```html
<select form-field type="string" name="approver" form-values="names">
</select>
```

