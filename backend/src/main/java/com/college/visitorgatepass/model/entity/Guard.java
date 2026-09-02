package com.college.visitorgatepass.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "guards")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class Guard extends User {
    // Specific guard fields can be added here
}
