recipes = []

recipes.append(['Keto Grilled Chicken Y Peanut Sauce', 1, [3, 5, 7]])
recipes.append(['Easy Keto Salmon Cakes', 3, [3, 5, 7]])
recipes.append(['Roasted Chicken Thighs with Mushrooms, Onions and Rosemary', 5, [3, 5, 7]])
recipes.append(['Keto Spaghetti Squash Primavera', 6, [3, 5, 9]])
recipes.append(['Keto Chicken Enchilada Bowl', 7, [3, 5, 7]])
recipes.append(['Gluten Free Enchilada Sauce', 8, [11, 12]])
recipes.append(['Parmesan Almond Flour Bread', 9, [2, 3]])
recipes.append(['Almond Flour Bread', 10, [2, 3]])
recipes.append(['Keto Quesadillas', 11, [1, 2, 3]])
recipes.append(['Minute Keto Pizza', 12, [3, 5]])
recipes.append(['Onion and Chive Keto Hashbrowns', 13, [3, 5]])
recipes.append(['4C Chips', 14, [1, 3]])
categories = {1:'Appetizers',
            2: 'Breads',
            3: 'Keto',
            4: 'Desserts',
            5: 'Entree',
            6: 'Thrive',
            7: 'Meats',
            8: 'Sides',
            9: 'Vegetarian',
            10: 'Pasta',
            11: 'Gluten-Free',
            12: 'Sauces',
            13: 'Salads',
            14: '',
            15: '',
            16: '',
            17: '',
            18: '',
            19: '',
            20: ''
        }
recipes.append(['Keto Morning Meatloaf', 15, [3, 5, 7]])
recipes.append(['Keto Swedish Meatballs', 16, [3, 5, 7]])
recipes.append(['Chicken Bacon Avocado Salad', 17, [3, 5, 13]])

for recipe in recipes:
    for key, value in recipe.items():
        print(key, ':', value)